using HotelMaster.Models;
using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.MasterModels;
using HotelMaster.Models.ResponseModels.VendorModels;

namespace HotelMaster.BusinessServices.Interfaces
{
    public interface IMasterServices
    {
        public Task<ApiResponse<List<StateResponse>>> GetStateList();

        public Task<ApiResponse<List<CityResponse>>> GetCityList(int stateId);

        public Task<ApiResponse<List<GetPropertyResponse>>> PropertyTypeList();


        public Task<ApiResponse<List<GetServiceMasterResponse>>> ServiceMasterList();
    }
}
