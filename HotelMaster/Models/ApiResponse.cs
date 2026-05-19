using System.Text.Json.Serialization;

namespace HotelMaster.Models
{
    public class ApiResponse<T>
    {
        public int StatusCode { get; set; }

        public bool IsError { get; set; }

        public string Message { get; set; } = string.Empty;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public T? Data { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object? Errors { get; set; }
    }
}
