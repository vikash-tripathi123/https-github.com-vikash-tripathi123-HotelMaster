namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorContactRequest
    {

        public int VendorContactId { get; set; }   // ✅ IMPORTANT (0 = Insert, >0 = Update)
        public int TenantId { get; set; }

        public int VendorId { get; set; }

        public string FullName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int Department { get; set; }

        public int Designation { get; set; }
    }
}
