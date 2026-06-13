using HotelMaster.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace HotelMaster.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        //public async Task Invoke(HttpContext context)
        //{

        //    try
        //    {
        //        await _next(context);
        //    } 
        //    catch (Exception ex)
        //    {
        //        var traceId = context.TraceIdentifier;

        //        _logger.LogError(ex, "Unhandled exception. TraceId: {TraceId}", traceId);

        //        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        //        context.Response.ContentType = "application/json";

        //        await context.Response.WriteAsJsonAsync(new
        //        {
        //            success = false,
        //            message = "Something went wrong. Please contact support.",
        //            traceId
        //        });
        //    }
        //}

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (HttpApiException ex)
            {
                context.Response.StatusCode = ex.StatusCode;
                context.Response.ContentType = "application/json";

                List<string> errors = new();

                try
                {
                    // Check if message looks like JSON validation error
                    if (!string.IsNullOrWhiteSpace(ex.Message) &&
                        ex.Message.TrimStart().StartsWith("{"))
                    {
                        var validationErrors =
                            JsonSerializer.Deserialize<Dictionary<string, string[]>>(ex.Message);

                        if (validationErrors != null)
                        {
                            errors = validationErrors
                                .SelectMany(x => x.Value)
                                .Distinct()
                                .ToList();
                        }
                    }

                    // If parsing failed or no errors found
                    if (!errors.Any())
                    {
                        errors.Add(ex.Message);
                    }
                }
                catch
                {
                    errors.Add(ex.Message);
                }

                await context.Response.WriteAsJsonAsync(new
                {
                    statusCode = ex.StatusCode,
                    isError = true,
                    message = errors.Count > 1
                        ? "Validation failed"
                        : errors.FirstOrDefault(),
                    errors
                });

                return;
            }
            catch (Exception ex)
            {
                var traceId = context.TraceIdentifier;

                _logger.LogError(
                    ex,
                    "Unhandled exception. TraceId: {TraceId}",
                    traceId);

                context.Response.StatusCode =
                    StatusCodes.Status500InternalServerError;

                context.Response.ContentType = "application/json";

                await context.Response.WriteAsJsonAsync(new
                {
                    statusCode = 500,
                    isError = true,
                    message = "Something went wrong. Please contact support.",
                    errors = new[]
                    {
                        ex.Message
                    },
                    traceId
                });
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class GlobalExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<GlobalExceptionMiddleware>();
        }
    }
}
