using HotelMaster.Models;
using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.VendorModels;

namespace HotelMaster.BusinessServices.Interfaces
{
    public interface IVendorServices
    {
        public Task<ApiResponse<List<VendorListResponse>>> GetVendorList(VendorRequestFilter filter );
        public Task<ApiResponse<object>> AddVendor(VendorPersonalBusinessRequest request);
        public Task<ApiResponse<string>> AddVendorContact(List<VendorContactRequest> request);
    }
}
