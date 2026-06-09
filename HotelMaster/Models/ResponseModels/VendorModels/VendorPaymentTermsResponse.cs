namespace HotelMaster.Models.ResponseModels.VendorModels
{
    public class VendorPaymentTermsResponse
    {
        public int VendorPaymentTermsId { get; set; }

        public string Terms { get; set; }

        public string CreditType { get; set; }

        public int CreditDays { get; set; }
    }
}
