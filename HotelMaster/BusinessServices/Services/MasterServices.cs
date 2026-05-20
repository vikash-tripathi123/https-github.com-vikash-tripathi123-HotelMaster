using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.Common.ApiEndPoints;
using HotelMaster.DataAccess;
using HotelMaster.Models;
using HotelMaster.Models.ResponseModels.MasterModels;
using HotelMaster.Models.ResponseModels.VendorModels;

namespace HotelMaster.BusinessServices.Services
{
    public class MasterServices : IMasterServices
    {
        public string BASEURL = "http://localhost:5174/api/";
        private readonly IDataService _dataService;
        public MasterServices(IDataService dataService)
        {
            _dataService = dataService; 
        }
        public async Task<ApiResponse<List<StateResponse>>> GetStateList()
        {
            try
            {

                string url = BASEURL + ApiEndPoints.STATE_LIST;
                var response = await _dataService.GetAsync<ApiResponse<List<StateResponse>>>(url,null);
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

        public async Task<ApiResponse<List<CityResponse>>> GetCityList(int stateId)
        {
            try
            {

                string url = BASEURL + ApiEndPoints.CITY_LIST+'/'+stateId; 
                
                var response = await _dataService.GetAsync<ApiResponse<List<CityResponse>>>(url, null);
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
