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
                var response = await _dataService.GetAsync<ApiResponse<List<VendorListResponse>>>(url, filter);
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
    }
}
