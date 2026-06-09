using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.Common.ApiEndPoints;
using HotelMaster.DataAccess;
using HotelMaster.Models;
using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.VendorModels;
using System;

namespace HotelMaster.BusinessServices.Services
{
    public class VendorServices : IVendorServices
    {
      

        private readonly IDataService _dataService;

        public string BASEURL = "http://localhost:5174/api/";
        public VendorServices(HttpClient httpClient, IDataService dataservice)
        {
           // _httpClient = httpClient;
            _dataService = dataservice;     
            
        }

        public async Task<ApiResponse<List<VendorListResponse>>> GetVendorList(VendorRequestFilter filter)
        {
            try {

                string url = BASEURL + ApiEndPoints.VENDOR_LIST;
                var response = await _dataService.PostAsync<ApiResponse<List<VendorListResponse>>>(url, filter);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }

        public async Task<ApiResponse<object>> AddVendor(VendorPersonalBusinessRequest request)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.ADDVENDOR;
                var response = await _dataService.PostAsync<ApiResponse<object>>(url, request);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }

        public async Task<ApiResponse<object>> UpdateVendor(int vendorId, VendorPersonalBusinessRequest request)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.UPDATE_VENDOR+"/"+vendorId;
                var response = await _dataService.PutAsync<ApiResponse<object>>(url, request);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }
        public async Task<ApiResponse<string>> AddVendorContact(List<VendorContactRequest> request)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.ADDVENDORCONTACT;
                var response = await _dataService.PostAsync<ApiResponse<string>>(url, request);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }

        public async Task<ApiResponse<string>> AddVendorFinancial(VendorFinancialiRequest request)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.ADDVENDORFINANCIAL;
                var response = await _dataService.PostAsync<ApiResponse<string>>(url, request);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }

        public async Task<ApiResponse<string>> UpdateVendorFinancial(int vendorLegalFinancialid, VendorFinancialiRequest request)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.UPDATE_VENDOR_FINANCIAL+"/"+vendorLegalFinancialid;
                var response = await _dataService.PutAsync<ApiResponse<string>>(url, request);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }


        public async Task<ApiResponse<string>> AddVendorPayment(VendorPaymentRequest request)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.ADD_VENDOR_PAYMENT;
                var response = await _dataService.PostAsync<ApiResponse<string>>(url, request);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }

        public async Task<ApiResponse<string>> UpdateVendorPayment(int VendorPaymentTermsId, VendorPaymentRequest request)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.UPDATE_VENDOR_PAYMENT+"/"+VendorPaymentTermsId;
                var response = await _dataService.PutAsync<ApiResponse<string>>(url, request);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }

        public async Task<ApiResponse<List<VendorAddDocumentResponse>>> AddVendorDocument(List<VendorDocumentRequest> request)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.ADD_VENDOR_DOCUMENT;
                var response = await _dataService.PostMultipartAnyAsync<ApiResponse<List<VendorAddDocumentResponse>>>(url, request);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }

        public async Task<ApiResponse<GetVendorDetailByVendorIdResponse>> GetVendorDetailById(int vendorId)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.GET_VENDOR_DETAILS_ID+"/"+vendorId;
                var response = await _dataService.GetAsync<ApiResponse<GetVendorDetailByVendorIdResponse>>(url,null);
                return response;
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "API is not reachable. Please ensure the service is running.",
                    ex
                );
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out. Please try again later.",
                    ex
                );
            }
        }


    }
}
