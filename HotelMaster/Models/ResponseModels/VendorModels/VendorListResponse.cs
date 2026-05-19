namespace HotelMaster.Models.ResponseModels.VendorModels
{
    public class VendorListResponse
    {
        public int VendorId { get; set; }

        public string VendorCode { get; set; }

        public string Business_Name { get; set; }

        public string Legal_Name { get; set; }

        public string Services { get; set; }

        public string ContactInfo { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string PaymentType { get; set; }

        public string CreditType { get; set; }

        public int CreditDays { get; set; }

        public string CityName { get; set; }

        public string StateName { get; set; }

        public string CountryName { get; set; }

        public string IsActive { get; set; }

        public int Rating { get; set; }

        public string IsPublish { get; set; }

        public string IsDraft { get; set; }

        public int TotalRecords { get; set; }
    }
}
