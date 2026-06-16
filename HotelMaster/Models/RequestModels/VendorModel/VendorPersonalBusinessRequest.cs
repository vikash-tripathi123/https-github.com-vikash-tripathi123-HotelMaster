namespace HotelMaster.Models.RequestModels.VendorModel
{
    using System.ComponentModel.DataAnnotations;

    public class VendorPersonalBusinessRequest
    {
        //  public int vendorId { get; set; }
        //public int TenantId { get; set; } = 1;

        //[Required(ErrorMessage = "Business name is required")]
        //public string Business_Name { get; set; }

        //[Required(ErrorMessage = "Legal name is required")]
        //public string Legal_Name { get; set; }

        //[Required(ErrorMessage = "Please select at least one service")]
        //public List<string> Services { get; set; }


        //[Required(ErrorMessage = "Star rating is required")]
        //public byte? Star_Rating { get; set; }

        //[Required(ErrorMessage = "Address Line 1 is required")]
        //public string AddressLine1 { get; set; }

        //public string? AddressLine2 { get; set; }

        //[Required(ErrorMessage = "City is required")]
        //public int? City { get; set; }

        //[Required(ErrorMessage = "State is required")]
        //public int? State { get; set; }

        //[Required(ErrorMessage = "Country is required")]
        //public int? Country { get; set; }

        //[Required(ErrorMessage = "Pin code is required")]
        //public string Pin_Code { get; set; }

        //[Required(ErrorMessage = "Please select business type")]
        //public int? Business_Type { get; set; }

        //public string UserName { get; set; }



        [Range(1, int.MaxValue, ErrorMessage = "TenantId is required")]
        public int TenantId { get; set; } = 1;

        [Required(ErrorMessage = "Business Name is required")]
        public string Business_Name { get; set; }

        [Required(ErrorMessage = "Legal Name is required")]
        [MaxLength(150, ErrorMessage = "Legal Name cannot exceed 150 characters")]
        public string Legal_Name { get; set; }

        [Required(ErrorMessage = "Please select at least one service")]
        [MinLength(1, ErrorMessage = "Please select at least one service")]
        public List<string> Services { get; set; }

        [Required(ErrorMessage = "Star Rating is required")]
        [Range(1, 5, ErrorMessage = "Star Rating must be between 1 and 5")]
        public byte? Star_Rating { get; set; }

        [Required(ErrorMessage = "Address Line 1 is required")]
        [MaxLength(250, ErrorMessage = "Address Line 1 cannot exceed 250 characters")]
        public string AddressLine1 { get; set; }

        [MaxLength(250, ErrorMessage = "Address Line 2 cannot exceed 250 characters")]
        public string? AddressLine2 { get; set; }

        [Required(ErrorMessage = "City is required")]
        [Range(1, int.MaxValue, ErrorMessage = "City is required")]
        public int? City { get; set; }

        [Required(ErrorMessage = "State is required")]
        [Range(1, int.MaxValue, ErrorMessage = "State is required")]
        public int? State { get; set; }

        [Required(ErrorMessage = "Country is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Country is required")]
        public int? Country { get; set; }

        [Required(ErrorMessage = "Pin Code is required")]
        [RegularExpression(@"^\d{4,10}$", ErrorMessage = "Pin Code must be numeric and between 4 to 10 digits")]
        public string Pin_Code { get; set; }

        [Required(ErrorMessage = "Business Type is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Business Type is required")]
        public int? Business_Type { get; set; }

        [Required(ErrorMessage = "UserName is required")]
        [MaxLength(100, ErrorMessage = "UserName cannot exceed 100 characters")]
        public string UserName { get; set; }

    }

}