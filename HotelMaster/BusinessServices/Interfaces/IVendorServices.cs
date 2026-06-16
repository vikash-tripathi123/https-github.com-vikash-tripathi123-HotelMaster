using HotelMaster.Models;
using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.VendorModels;

namespace HotelMaster.BusinessServices.Interfaces
{
    public interface IVendorServices
    {
        public Task<ApiResponse<List<VendorListResponse>>> GetVendorList(VendorRequestFilter filter );
        public Task<ApiResponse<object>> AddVendor(VendorPersonalBusinessRequest request);

        public Task<ApiResponse<object>> UpdateVendor(int vendorId, VendorPersonalBusinessRequest request);
        public Task<ApiResponse<string>> AddVendorContact(List<VendorContactRequest> request);

        public Task<ApiResponse<string>> AddVendorFinancial(VendorFinancialiRequest request);

        public Task<ApiResponse<string>> UpdateVendorFinancial(int vendorLegalFinancialid, VendorFinancialiRequest request);
        public Task<ApiResponse<string>> AddVendorPayment(VendorPaymentRequest request);

        public Task<ApiResponse<string>> UpdateVendorPayment(int VendorPaymentTermsId, VendorPaymentRequest request);
        public Task<ApiResponse<List<VendorAddDocumentResponse>>> AddVendorDocument(List<VendorDocumentRequest> request);

        public Task<ApiResponse<GetVendorDetailByVendorIdResponse>> GetVendorDetailById(int vendorId);

        public Task<ApiResponse<CheckVendorFormStatusResponse>> CheckVendorFormStatus(int vendorId);
    }
}
