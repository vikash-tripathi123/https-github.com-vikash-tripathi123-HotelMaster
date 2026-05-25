using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.BusinessServices.Services;
using HotelMaster.Models;
using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.MasterModels;
using HotelMaster.Models.ResponseModels.VendorModels;
using HotelMaster.Models.ViewModels.VendorModels;
using Microsoft.AspNetCore.Mvc;

namespace HotelMaster.Controllers
{
    public class VendorController : Controller
    {
        private readonly IVendorServices _verndorService;
        private readonly IMasterServices _masterServices;
        public VendorController(IVendorServices vendorServices, IMasterServices masterServices)
        {
            _verndorService = vendorServices;   
            _masterServices = masterServices;
        }
        public async Task<IActionResult> Index()
        {
           // ApiResponse<List<StateResponse>> response = await _masterServices.GetStateList();

            return View();
        }

        public async Task<IActionResult> registration() { 

    
         //   var registration = new iVendorViewModels();
              //  Business = new BusinessModel()
           

            return View();
        }
        [HttpGet]
        public async Task<IActionResult> GetVendorList(VendorRequestFilter filter)
        {
            filter.TenantId = 1; 
            ApiResponse<List<VendorListResponse>> response = await _verndorService.GetVendorList(filter);

            return Json(response); 
         
        }


        [HttpGet]
        public async Task<IActionResult> StateList()
        {
            ApiResponse<List<StateResponse>> response = await _masterServices.GetStateList();

            return View("Index", response.Data);
        }


        [HttpPost]
        public async Task<IActionResult> AddVendor([FromBody]VendorPersonalBusinessRequest request)
        {
            var response = await _verndorService.AddVendor(request);

            return Json(response);
        }
    }
}
