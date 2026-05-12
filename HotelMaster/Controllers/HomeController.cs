using System.Diagnostics;
using HotelMaster.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelMaster.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult HotelMaster()
        {
            return View();
        }

        public IActionResult AddHotel()
        {
            return View();
        }

        public IActionResult AddVendor()
        {
            return View();
        }
        public IActionResult HotelsPreview()
        {
            return View();
        }
        public IActionResult ManageRatesAndInventory()
        {
            return View();
        }
        public IActionResult AddInventory()
        {
            return View();
        }
        public IActionResult AddRates()
        {
            return View();
        }
        public IActionResult Mailers()
        {
            return View();
        }
        public IActionResult VendorRegistrationForm()
        {
            return View();
        }
        public IActionResult VendorDetails()
        {
            return View();
        }
    }
}
