using HotelMaster.Common.ApiEndPoints;
using HotelMaster.Common.CommonMethods;
using HotelMaster.Models;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http;
using System.Net.Http.Headers;

namespace HotelMaster.DataAccess
{
    public class DataService : IDataService
    {
        private readonly HttpClient _httpClient;
        //private readonly HttpContext _contextAccessor;
      //  public string BASEURL = "http://localhost:5174/api/"; 
        public DataService(HttpClient httpClient)
        {
            _httpClient = httpClient;   
           // _contextAccessor = contextAccessor;
        }


        public async Task<T> GetAsync<T>(string url, object? parameter)
        {
           // string? token = _contextAccessor.Session.GetString("AccessToken");

            //_httpClient.DefaultRequestHeaders.Authorization = new  AuthenticationHeaderValue("Bearer", "your_token_here");

           string uri = "";
            if (parameter != null) {

                uri = CommonMethods.BuildUrlQueryString(url, parameter);
            }

            var response = await _httpClient.GetAsync(uri);

            // ✅ Deserialize into T
            var result = await response.Content.ReadFromJsonAsync<T>();

            return result!;

        }

        public Task<T> PostAsync<T>(string url, object parameter)
        {
            throw new NotImplementedException();
        }

        public Task<T> PutAsync<T>(string url, object parameter)
        {
            throw new NotImplementedException();
        }

        public Task<T> DeleteAsync<T>(string url, object parameter)
        {
            throw new NotImplementedException();
        }

    }
}
