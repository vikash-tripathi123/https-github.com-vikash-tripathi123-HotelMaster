namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorDocumentRequest
    {
        public int DocumentId { get; set; }
        public int TenantId { get; set; }
        public int VendorId { get; set; }
        public int DocumentType { get; set; }
        public string DocumentName { get; set; }
        public IFormFile FilePath { get; set; }
    }
}
