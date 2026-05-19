using HotelMaster.BusinessServices;
using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.DataAccess;
using HotelMaster.Middlewares;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Serilog;

try
{ 
var builder = WebApplication.CreateBuilder(args);
    // Add services to the container.


    /* =======================
       SERILOG CONFIGURATION
    ======================= */
Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(builder.Configuration)
        .Enrich.FromLogContext()
        .WriteTo.Console()
        .WriteTo.File(
            path: "Logs/error.txt",
            rollingInterval: RollingInterval.Day,
            retainedFileCountLimit: 30,
            fileSizeLimitBytes: 10_000_000,
            rollOnFileSizeLimit: true)
        .CreateLogger();

builder.Host.UseSerilog();


builder.Services
    .AddControllersWithViews()
    .AddRazorRuntimeCompilation();

// Add services to the container.
builder.Services.AddControllersWithViews(); 
    builder.Services.AddSingleton<IDataService, DataService>();
    builder.Services.AddHttpClient<IDataService, DataService>();

 builder.Services.AddScoped<IVendorServices, VendorServices>();

// AntiForgeryToken for secure UI
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
});


builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "RequestVerificationToken";
});

builder.Services.AddSession(options =>
{
        options.IdleTimeout = TimeSpan.FromMinutes(30);
        options.Cookie.HttpOnly = true;
        options.Cookie.IsEssential = true;
        options.Cookie.Name = "travel";
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.Strict;
});

builder.Services.AddRateLimiter(options =>
    {
        options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
        options.OnRejected = async (context, token) =>
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
            await context.HttpContext.Response.WriteAsJsonAsync(new
            {
                Message = "Too many requests. Please try again later.",
                RetryAfter = "10 seconds",
                StatusCode = 429
            }, cancellationToken: token);
        };

        options.AddFixedWindowLimiter("fixed", opt =>
        {
            opt.PermitLimit = 2;
            opt.Window = TimeSpan.FromSeconds(10);
            opt.QueueLimit = 0;
        });
    });


    var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();


//app.UseSession();

app.UseAuthorization();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=AddVendor}");
////pattern: "{controller=Vendor}/{action=Index}");

//app.UseSecurityMiddleware();
app.UseGlobalExceptionMiddleware();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Vendor}/{action=Index}/{id?}");

app.Run();

}
catch (Exception ex)
{
    Console.WriteLine( $"{ex} Application failed to start");
    Log.Fatal(ex, "Application failed to start");
}
finally
{
    Log.CloseAndFlush();
}