using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.Models;
using HotelMaster.Models.ResponseModels.MasterModels;
using Microsoft.AspNetCore.Mvc;

namespace HotelMaster.ViewComponents
{
    public class PropertyViewComponent: ViewComponent
    {
        private readonly IMasterServices _masterServices;
        public PropertyViewComponent(IMasterServices masterServices)
        {
            _masterServices = masterServices;
        }

        public async Task<IViewComponentResult> InvokeAsync(string item)
        {

            ApiResponse<List<GetPropertyResponse>> response = await _masterServices.PropertyTypeList();


            return View("~/Views/Shared/Components/Dropdown/PropertyDropdown.cshtml", response.Data);
        }
    }
}
