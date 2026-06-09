using System.ComponentModel.DataAnnotations;

namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorPaymentRequest
    {
        public int VendorPaymentTermsId { get; set; }
        public int TenantId { get; set; }
        public int VendorId { get; set; }

        [Required(ErrorMessage = "Please select payment terms")]
        public string Terms { get; set; }

        [Required(ErrorMessage = "Please select credit type")]
        public string CreditType { get; set; }

        [Required(ErrorMessage = "Credit days is required")]
        [Range(1, 365, ErrorMessage = "Enter valid number of days")]
        public int CreditDays { get; set; }


    }
}
