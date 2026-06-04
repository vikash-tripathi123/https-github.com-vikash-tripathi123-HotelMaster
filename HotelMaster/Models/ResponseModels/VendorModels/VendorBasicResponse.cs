namespace HotelMaster.Models.ResponseModels.VendorModels
{
    public class VendorBasicResponse
    {
        public int VendorId { get; set; }

        public string ServiceType { get; set; }
        public string BusinessName { get; set; }

        public string LegalName { get; set; }

        public int StarRating { get; set; }

        public string BusinessType { get; set; }

        public string Terms { get; set; }

        public string CreditType { get; set; }

        public int CreditDays { get; set; }

        public string FullAddress { get; set; }

        public int Country { get; set; }

        public int State { get; set; }

        public int City { get; set; }
    }
}
