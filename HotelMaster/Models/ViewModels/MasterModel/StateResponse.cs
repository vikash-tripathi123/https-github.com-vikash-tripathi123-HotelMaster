namespace HotelMaster.Models.ViewModels.MasterModel
{
    public class StateResponse
    {
        public int StateId { get; set; }

        public string StateName { get; set; }

        public string? StateCode { get; set; }

        public string? CountryCode { get; set; }
    }
}
