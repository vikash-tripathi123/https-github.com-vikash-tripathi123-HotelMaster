using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;

namespace HotelMaster.Middlewares
{
    public class SessionMiddleware
    {
        private readonly RequestDelegate _next;

        public SessionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Current request path
            var path = context.Request.Path.Value?.ToLower() ?? "";

            /* =========================
               PUBLIC / STATIC ROUTES
            ========================= */

            // Allow public pages and static files
            if (path.StartsWith("/account/login") ||
                path.StartsWith("/account/logout") ||
                path.StartsWith("/css") ||
                path.StartsWith("/js") ||
                path.StartsWith("/lib") ||
                path.StartsWith("/images") ||
                path.StartsWith("/favicon"))
            {
                await _next(context);
                return;
            }

            /* =========================
               SESSION TOKEN CHECK
            ========================= */

            var token = context.Session.GetString("accessToken");

            // Token missing
            if (string.IsNullOrEmpty(token))
            {
                context.Session.Clear();

                context.Response.Redirect("/Account/Login");

                return;
            }

            /* =========================
               JWT EXPIRY CHECK
            ========================= */

            try
            {
                var handler = new JwtSecurityTokenHandler();

                var jwtToken = handler.ReadJwtToken(token);

                // Check token expiry
                if (jwtToken.ValidTo < DateTime.UtcNow)
                {
                    context.Session.Clear();

                    context.Response.Redirect("/Account/Login");

                    return;
                }
            }
            catch
            {
                // Invalid token
                context.Session.Clear();

                context.Response.Redirect("/Account/Login");

                return;
            }

            // Continue request pipeline
            await _next(context);
        }
    }

    /* =========================
       EXTENSION METHOD
    ========================= */

    public static class SessionMiddlewareExtensions
    {
        public static IApplicationBuilder UseSessionMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SessionMiddleware>();
        }
    }
}