namespace HotelMaster.Models.ResponseModels.VendorModels
{
    public class CheckVendorFormStatusResponse
    {
        public int VendorId { get; set; }

        public bool IsCompleted { get; set; }

        public List<string> MissingForms { get; set; } = new();
    }
}
