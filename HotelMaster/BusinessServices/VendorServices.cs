using HotelMaster.BusinessServices.Interfaces;

namespace HotelMaster.BusinessServices
{
    public class VendorServices : IVendorServices
    {
        private readonly HttpClient _httpClient;
        public VendorServices(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }



    }
}
