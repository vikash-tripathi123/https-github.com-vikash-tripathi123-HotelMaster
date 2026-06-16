using System.ComponentModel.DataAnnotations;

namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorContactRequest
    {
        public int VendorContactId { get; set; } // 0 = Insert, >0 = Update

        [Range(1, int.MaxValue, ErrorMessage = "TenantId must be greater than 0")]
        public int TenantId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "VendorId must be greater than 0")]
        public int VendorId { get; set; }

        [Required(ErrorMessage = "Full name is required")]
        [MaxLength(100, ErrorMessage = "Full name cannot exceed 100 characters")]
        public string FullName { get; set; }

        //[Required(ErrorMessage = "Phone number is required")]
        //[Range(0, int.MaxValue, ErrorMessage = "Please enter valid phone number")]
        //[RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits")]
        //public string Phone { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone number should be 10 digit")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Please enter valid phone number")]
        public string Phone { get; set; }



        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [MaxLength(150, ErrorMessage = "Email cannot exceed 150 characters")]
        public string Email { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Department is required")]
        public int Department { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Designation is required")]
        public int Designation { get; set; }

    }
}
