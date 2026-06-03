namespace HotelMaster.Models.ResponseModels.VendorModels
{
    public class VendorLegalFinanceResponse
    {
        public int VendorLegalFinancialId { get; set; }

        public string Name { get; set; }

        public string BankName { get; set; }

        public string AccountNumber { get; set; }

        public string IfscCode { get; set; }

        public decimal TdsPercent { get; set; }

        public string PanName { get; set; }

        public string PanNumber { get; set; }

        public string GstName { get; set; }

        public string GstNumber { get; set; }

        public string MsmeName { get; set; }

        public string MsmeNumber { get; set; }
    }
}
