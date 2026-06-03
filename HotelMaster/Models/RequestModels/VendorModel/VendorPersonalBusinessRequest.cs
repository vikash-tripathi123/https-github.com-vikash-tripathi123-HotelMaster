namespace HotelMaster.Models.RequestModels.VendorModel
{
    using System.ComponentModel.DataAnnotations;

    public class VendorPersonalBusinessRequest
    {
        public int TenantId { get; set; } = 1;

        [Required(ErrorMessage = "Business name is required")]
        public string Business_Name { get; set; }

        [Required(ErrorMessage = "Legal name is required")]
        public string Legal_Name { get; set; }

        [Required(ErrorMessage = "Please select at least one service")]
        public List<string> Services { get; set; }


        [Required(ErrorMessage = "Star rating is required")]
        public byte? Star_Rating { get; set; }

        [Required(ErrorMessage = "Address Line 1 is required")]
        public string AddressLine1 { get; set; }

        public string? AddressLine2 { get; set; }

        [Required(ErrorMessage = "City is required")]
        public int? City { get; set; }

        [Required(ErrorMessage = "State is required")]
        public int? State { get; set; }

        [Required(ErrorMessage = "Country is required")]
        public int? Country { get; set; }

        [Required(ErrorMessage = "Pin code is required")]
        public string Pin_Code { get; set; }

        [Required(ErrorMessage = "Please select business type")]
        public int? Business_Type { get; set; }

        public string UserName { get; set; }
    }
}