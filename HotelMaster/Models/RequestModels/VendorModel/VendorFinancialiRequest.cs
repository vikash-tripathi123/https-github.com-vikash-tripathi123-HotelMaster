using System.ComponentModel.DataAnnotations;

namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorFinancialiRequest
    {
        //public int? VendorLegalFinancialId { get; set; }
        //public int TenantId { get; set; } = 1;
        //public int VendorId { get; set; }
        //public string legalName { get; set; }
        //public string BankName { get; set; }
        //public string AccountNumber { get; set; }
        //public string Ifsc_Code { get; set; }
        //public decimal Applicable_tds_percent { get; set; }
        //public string Pan_Name_Holder { get; set; }
        //public string Pan_number { get; set; }
        //public string Gst_Registered_Name { get; set; }
        //public string Gst_in_number { get; set; }
        //public string Msme_certificate_holder_name { get; set; }
        //public string Msme_registration_number { get; set; }
        //public string Tan_number { get; set; } 


        public int? VendorLegalFinancialId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "TenantId must be greater than 0")]
        public int TenantId { get; set; } = 1;

        [Range(1, int.MaxValue, ErrorMessage = "VendorId must be greater than 0")]
        public int VendorId { get; set; }

        [Required(ErrorMessage = "Legal name is required")]
        [StringLength(200, ErrorMessage = "Legal name cannot exceed 200 characters")]
        public string legalName { get; set; }

        [Required(ErrorMessage = "Bank name is required")]
        [StringLength(150, ErrorMessage = "Bank name cannot exceed 150 characters")]
        public string BankName { get; set; }

        [Required(ErrorMessage = "Account number is required")]
        [RegularExpression(@"^\d{9,18}$",
            ErrorMessage = "Account number must be between 9 and 18 digits")]
        public string AccountNumber { get; set; }

        [Required(ErrorMessage = "IFSC code is required")]
        [RegularExpression(@"^[A-Z]{4}0[A-Z0-9]{6}$",
            ErrorMessage = "Invalid IFSC code format")]
        public string Ifsc_Code { get; set; }

        [Range(typeof(decimal), "0", "100",
            ErrorMessage = "Applicable TDS percent must be between 0 and 100")]
        public decimal Applicable_tds_percent { get; set; }

        [Required(ErrorMessage = "PAN holder name is required")]
        [StringLength(150, ErrorMessage = "PAN holder name cannot exceed 150 characters")]
        public string Pan_Name_Holder { get; set; }

        [Required(ErrorMessage = "PAN number is required")]
        [RegularExpression(@"^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
            ErrorMessage = "Invalid PAN number format")]
        public string Pan_number { get; set; }

        [StringLength(200, ErrorMessage = "GST Registered Name cannot exceed 200 characters")]
        public string Gst_Registered_Name { get; set; }

        [RegularExpression(
            @"^$|^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
            ErrorMessage = "Invalid GSTIN format")]
        public string Gst_in_number { get; set; }

        [StringLength(200, ErrorMessage = "MSME certificate holder name cannot exceed 200 characters")]
        public string Msme_certificate_holder_name { get; set; }

        [StringLength(50, ErrorMessage = "MSME registration number cannot exceed 50 characters")]
        public string Msme_registration_number { get; set; }

        [RegularExpression(
            @"^$|^[A-Z]{4}[0-9]{5}[A-Z]{1}$",
            ErrorMessage = "Invalid TAN number format")]
        public string Tan_number { get; set; }
    }
}
