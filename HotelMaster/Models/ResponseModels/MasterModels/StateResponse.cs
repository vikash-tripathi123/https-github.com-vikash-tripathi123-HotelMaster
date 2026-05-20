namespace HotelMaster.Models.ResponseModels.MasterModels
{
    public class StateResponse
    {
        public int StateId { get; set; }

        public string StateName { get; set; }

        public string? StateCode { get; set; }

        public string? CountryCode { get; set; }
    }
}
