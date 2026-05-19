using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.Models;
using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.VendorModels;
using Microsoft.AspNetCore.Mvc;

namespace HotelMaster.Controllers
{
    public class VendorController : Controller
    {
        private readonly IVendorServices _verndorService; 
        public VendorController(IVendorServices vendorServices)
        {
            _verndorService = vendorServices;   
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetVendorList(VendorRequestFilter filter)
        {
            filter.TenantId = 1; 
            ApiResponse<List<VendorListResponse>> response = await _verndorService.GetVendorList(filter);

            return Json(response); 
         
        }
    }
}
