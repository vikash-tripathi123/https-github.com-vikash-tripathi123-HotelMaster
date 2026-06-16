using System.ComponentModel.DataAnnotations;

namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorDocumentRequest
    {
        //public int DocumentId { get; set; }
        //public int TenantId { get; set; }
        //public int VendorId { get; set; }
        //public int DocumentType { get; set; }
        //public string DocumentName { get; set; }
        //public IFormFile FilePath { get; set; }


        public int DocumentId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "TenantId must be greater than 0")]
        public int TenantId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "VendorId must be greater than 0")]
        public int VendorId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "DocumentType must be greater than 0")]
        public int DocumentType { get; set; }

        [Required(ErrorMessage = "Document name is required")]
        [StringLength(100, ErrorMessage = "Document name cannot exceed 100 characters")]
        public string DocumentName { get; set; }

        [Required(ErrorMessage = "File is required")]
        public IFormFile FilePath { get; set; }

    }
}
