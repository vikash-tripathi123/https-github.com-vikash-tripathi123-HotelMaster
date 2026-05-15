using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace HotelMaster.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class SessionMiddleware
    {
        private readonly RequestDelegate _next;

        public SessionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {

            var path = context.Request.Path.Value.ToLower();

            // Allow public routes
            if (path.StartsWith("/account/sendopsotp"))
               
            {
                await _next(context);
                return;
            }

            //var userName = context.Session.GetString("UserId");
            var token = context.Session.GetString("accessToken"); // ✅ FIXED

            if (string.IsNullOrEmpty(token))
            {
                // ✅ AJAX request → return 401
                if (context.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Session expired");
                    return;
                }

                // ✅ Normal request → redirect
                context.Response.Redirect("/Account/Login");
                return;
            }

            await _next(context);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class SessionMiddlewareExtensions
    {
        public static IApplicationBuilder UseSessionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SessionMiddleware>();
        }
    }
}
