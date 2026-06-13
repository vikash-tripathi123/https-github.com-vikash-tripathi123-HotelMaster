namespace HotelMaster.Models
{
    public class HttpApiException : Exception
    {
        public int StatusCode { get; }

        public HttpApiException(
            string message,
            int statusCode)
            : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
