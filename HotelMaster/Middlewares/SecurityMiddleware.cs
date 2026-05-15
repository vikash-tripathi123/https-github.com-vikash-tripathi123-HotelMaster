using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace HotelMaster.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class SecurityMiddleware
    {
        private readonly RequestDelegate _next;

        public SecurityMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {

            var request = context.Request;

            // Combine full request data
            string url = request.Path + request.QueryString;

            // Simple attack patterns
            string[] attackPatterns =
            {
                "select ", "insert ", "delete ", "drop ", "update ",
                "<script", "</script>",
                "--", ";--", "xp_", "exec ", "union "
            };

            foreach (var pattern in attackPatterns)
            {
                if (url.ToLower().Contains(pattern))
                {
                   // _logger.LogWarning($"Blocked suspicious request: {url}");

                    context.Response.StatusCode = 403;
                    await context.Response.WriteAsync("Forbidden Request");
                    return;
                }
            }

            await _next(context);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class SecurityMiddlewareExtensions
    {
        public static IApplicationBuilder UseSecurityMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SecurityMiddleware>();
        }
    }
}
