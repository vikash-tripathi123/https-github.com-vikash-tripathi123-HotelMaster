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

        private static readonly JsonSerializerOptions JsonOptions =
     new JsonSerializerOptions
     {
         PropertyNameCaseInsensitive = true
     };
        public DataService(HttpClient httpClient)
        {
            _httpClient = httpClient;   
           // _contextAccessor = contextAccessor;
        }


        public async Task<T> GetAsync<T>(
        string url,
        object? parameter = null)
        {
            try
            {
                string uri = parameter != null
                    ? CommonMethods.BuildUrlQueryString(
                        url,
                        parameter)
                    : url;

                var response =
                    await _httpClient.GetAsync(uri);

                return await HandleResponseAsync<T>(
                    response);
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "Unable to connect to API.",
                    ex);
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out.",
                    ex);
            }
        }

        public async Task<T> PostAsync<T>(
       string url,
       object parameter)
        {
            try
            {
                var json =
                    JsonSerializer.Serialize(parameter);

                using var content =
                    new StringContent(
                        json,
                        Encoding.UTF8,
                        "application/json");

                var response =
                    await _httpClient.PostAsync(
                        url,
                        content);

                return await HandleResponseAsync<T>(
                    response);
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "Unable to connect to API.",
                    ex);
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out.",
                    ex);
            }
        }

        public async Task<T> PutAsync<T>(
     string url,
     object parameter)
        {
            try
            {
                var json =
                    JsonSerializer.Serialize(parameter);

                using var content =
                    new StringContent(
                        json,
                        Encoding.UTF8,
                        "application/json");

                var response =
                    await _httpClient.PutAsync(
                        url,
                        content);

                return await HandleResponseAsync<T>(
                    response);
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "Unable to connect to API.",
                    ex);
            }
            catch (TaskCanceledException ex)
            {
                throw new ApplicationException(
                    "API request timed out.",
                    ex);
            }
        }

        public Task<T> DeleteAsync<T>(string url, object parameter)
        {
            throw new NotImplementedException();
        }

        public async Task<T> PostMultipartAnyAsync<T>(
     string url,
     object data)
        {
            try
            {
                using var content =
                    new MultipartFormDataContent();

                if (data is IEnumerable<object> list)
                {
                    int index = 0;

                    foreach (var item in list)
                    {
                        AddObjectToFormData(
                            content,
                            item,
                            $"[{index}]");

                        index++;
                    }
                }
                else
                {
                    AddObjectToFormData(
                        content,
                        data,
                        "");
                }

                using var response =
                    await _httpClient.PostAsync(
                        url,
                        content);

                return await HandleResponseAsync<T>(
                    response
                    );
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException(
                    "Unable to connect to API.",
                    ex);
            }
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


        private async Task<T> HandleResponseAsync<T>(
         HttpResponseMessage response)
        {
            var responseContent =
                await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                string errorMessage =
                    ExtractErrorMessage(responseContent);

                throw new HttpApiException(
                    errorMessage,
                    (int)response.StatusCode);
            }

            var result = JsonSerializer.Deserialize<T>(
                responseContent,
                JsonOptions);

            return result!;
        }


        private static string ExtractErrorMessage(string responseContent)
        {
            try
            {
                using var doc = JsonDocument.Parse(responseContent);
                var root = doc.RootElement;

                // First priority : message
                if (root.TryGetProperty("message", out var message))
                {
                    var msg = message.GetString();

                    if (!string.IsNullOrWhiteSpace(msg))
                        return msg;
                }

                // Second priority : errors
                if (root.TryGetProperty("errors", out var errors))
                {
                    // string
                    if (errors.ValueKind == JsonValueKind.String)
                    {
                        return errors.GetString() ?? "Unknown error";
                    }

                    // array
                    if (errors.ValueKind == JsonValueKind.Array)
                    {
                        return string.Join(
                            Environment.NewLine,
                            errors.EnumerateArray()
                                  .Select(x => x.ToString()));
                    }

                    // object / key-value pair
                    if (errors.ValueKind == JsonValueKind.Object)
                    {
                        var errorList = new List<string>();

                        foreach (var item in errors.EnumerateObject())
                        {
                            if (item.Value.ValueKind == JsonValueKind.Array)
                            {
                                errorList.AddRange(
                                    item.Value.EnumerateArray()
                                              .Select(x => x.ToString()));
                            }
                            else
                            {
                                errorList.Add(item.Value.ToString());
                            }
                        }

                        return string.Join(
                            Environment.NewLine,
                            errorList);
                    }
                }

                return responseContent;
            }
            catch
            {
                return responseContent;
            }
        }


    }



}
