namespace HotelMaster.Models.RequestModels.VendorModel
{
    public class VendorRequestFilter: PaginationRequest
    {
        public int TenantId { get; set; }

        public int? ServiceCategory { get; set; } = 0;

        public string? PaymentType { get; set; } = string.Empty;

        public int? CityId { get; set; } = 0;

        public int? StateId { get; set; } = 0;

        public int? CountryId { get; set; } = 0;

        public string? GlobalSearch { get; set; } = string.Empty;

        public int? Status { get; set; } = 0;

        public int? Rating { get; set; } = 0;
    }
}
