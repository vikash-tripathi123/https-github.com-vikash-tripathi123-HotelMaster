using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.Models;
using HotelMaster.Models.ResponseModels.MasterModels;
using Microsoft.AspNetCore.Mvc;

namespace HotelMaster.ViewComponents
{
    public class ServiceMasterViewComponent : ViewComponent
    {

        private readonly IMasterServices _masterServices;
        public ServiceMasterViewComponent(IMasterServices masterServices)
        {
            _masterServices = masterServices;
        }

        public async Task<IViewComponentResult> InvokeAsync(string item)
        {

            ApiResponse<List<GetServiceMasterResponse>> response = await _masterServices.ServiceMasterList();


            return View("~/Views/Shared/Components/Dropdown/ServiceMasterDropdown.cshtml", response.Data);
        }
    }
}
