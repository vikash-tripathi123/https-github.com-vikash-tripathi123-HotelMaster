using HotelMaster.Common.ApiEndPoints;
using HotelMaster.Common.CommonMethods;
using HotelMaster.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

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


        public async Task<T> GetAsync<T>(string url, object? parameter = null)
        {
           // string? token = _contextAccessor.Session.GetString("AccessToken");

            //_httpClient.DefaultRequestHeaders.Authorization = new  AuthenticationHeaderValue("Bearer", "your_token_here");

           string uri = "";
            if (parameter != null)
            {

                uri = CommonMethods.BuildUrlQueryString(url, parameter);
            }
            else {
                uri = url; 
            }

                var response = await _httpClient.GetAsync(uri);

            // ✅ Deserialize into T
            var result = await response.Content.ReadFromJsonAsync<T>();

            return result!;

        }

        public async Task<T> PostAsync<T>(string url, object parameter)
        {

            var json = JsonSerializer.Serialize(parameter);

            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(url, content);

            // ✅ Deserialize into T
            var result = await response.Content.ReadFromJsonAsync<T>();

            return result!;
        }

        public async Task<T> PutAsync<T>(string url, object parameter)
        {
            var json = JsonSerializer.Serialize(parameter);

            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync(url, content);

            // ✅ Deserialize into T
            var result = await response.Content.ReadFromJsonAsync<T>();

            return result!;
        }

        public Task<T> DeleteAsync<T>(string url, object parameter)
        {
            throw new NotImplementedException();
        }

        public async Task<T> PostMultipartAnyAsync<T>(string url, object data)
        {
            var content = new MultipartFormDataContent();

            // ✅ Handle if it's a LIST
            if (data is IEnumerable<object> list)
            {
                int index = 0;

                foreach (var item in list)
                {
                    AddObjectToFormData(content, item, $"[{index}]");
                    index++;
                }
            }
            else
            {
                // ✅ Single object
                AddObjectToFormData(content, data, "");
            }

            var response = await _httpClient.PostAsync(url, content);

            var result = await response.Content.ReadFromJsonAsync<T>();

            return result!;
        }

        private void AddObjectToFormData(MultipartFormDataContent content, object obj, string prefix)
        {
            var properties = obj.GetType().GetProperties();

            foreach (var prop in properties)
            {
                var value = prop.GetValue(obj);

                if (value == null) continue;

                string key = string.IsNullOrEmpty(prefix)
                    ? prop.Name
                    : $"{prefix}.{prop.Name}";

                // ✅ FILE
                if (value is IFormFile file)
                {
                    var fileContent = new StreamContent(file.OpenReadStream());
                    fileContent.Headers.ContentType =
                        new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType);

                    content.Add(fileContent, key, file.FileName);
                }
                else
                {
                    content.Add(new StringContent(value.ToString()), key);
                }
            }
        }

    }
}
