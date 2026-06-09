namespace HotelMaster.Models.ResponseModels.VendorModels
{
    public class GetVendorDetailByVendorIdResponse
    {
        public VendorBasicResponse? VendorBasicDetail { get; set; }

        public List<VendorContactResponse>? VendorContacts { get; set; }

        public VendorLegalFinanceResponse? VendorLegalFInancialDetail { get; set; }

        public VendorPaymentTermsResponse? VendorPaymentTerms { get; set; }
        public List<VendorDocumentResponse>? VendorDocuments { get; set; }
    }
}
