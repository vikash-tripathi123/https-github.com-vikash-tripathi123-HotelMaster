namespace HotelMaster.Models
{
    public class PaginationRequest
    {
        public int? PageSize { get; set; } = 10;

        public int? PageNumber { get; set; } = 1;

        public string? SortBy { get; set; }

        public string? SortOrder { get; set; }
    }
}
