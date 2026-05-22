using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.Models;
using HotelMaster.Models.ResponseModels.MasterModels;
using Microsoft.AspNetCore.Mvc;

namespace HotelMaster.ViewComponents
{
    public class DropdownViewComponent : ViewComponent
    {
        private readonly IMasterServices _masterServices;
        public DropdownViewComponent(IMasterServices masterServices)
        {
            _masterServices = masterServices;   
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            ApiResponse<List<StateResponse>> response = await _masterServices.GetStateList();
          

                    return View("DropDowns", response.Data);
        }
    
    
    }
}
