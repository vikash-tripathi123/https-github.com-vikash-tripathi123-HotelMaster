namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorDocumentRequest
    {
        public int TenantId { get; set; }
        public int VendorId { get; set; }
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
        public IFormFile FilePath { get; set; }
    }
}
