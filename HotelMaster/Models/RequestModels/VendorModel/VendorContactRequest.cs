namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorContactRequest
    {
        public int TenantId { get; set; } = 1;

        public int VendorId { get; set; } = 3;

        public string FullName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int Department { get; set; }

        public int Designation { get; set; }
    }
}
