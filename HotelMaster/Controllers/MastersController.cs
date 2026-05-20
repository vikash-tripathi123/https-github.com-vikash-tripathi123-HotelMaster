using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.Models;
using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.MasterModels;
using HotelMaster.Models.ResponseModels.VendorModels;
using Microsoft.AspNetCore.Mvc;

namespace HotelMaster.Controllers
{
    public class MastersController : Controller
    {
        private readonly IMasterServices _masterServices;

        public MastersController(IMasterServices masterServices)
        {
            _masterServices = masterServices;   
        }
        public async Task<IActionResult> Index()
        {
            ApiResponse<List<StateResponse>> response = await _masterServices.GetStateList();
            return View(response.Data);
        }


        [HttpGet]
        public async Task<IActionResult> StateList() 
        {
            ApiResponse<List<StateResponse>> response = await _masterServices.GetStateList();

            return Json(response);
            return Json(response);
        }

        [HttpGet]
        public async Task<IActionResult> CityList(int stateId)
        {
            ApiResponse<List<CityResponse>> response = await _masterServices.GetCityList(stateId);

            return Json(response);
        }

    }
}
