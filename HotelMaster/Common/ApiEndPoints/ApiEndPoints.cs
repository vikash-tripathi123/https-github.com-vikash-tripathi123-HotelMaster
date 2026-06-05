namespace HotelMaster.Common.ApiEndPoints
{
    public static class ApiEndPoints
    {
        public const string VENDOR_LIST = "VendorMasters/get_vendor_list";



        //MasterService
        public const string STATE_LIST = "Masters/get_state_list";

        public const string CITY_LIST = "Masters/get_city_list";

        public const string SERVICE_MASTERS = "Masters/get_service_master_list";

        public const string PROPERTY_TYPE = "Masters/get_property_type_list";

        public const string ADDVENDOR = "VendorMasters/AddVendor";

        public const string UPDATE_VENDOR = "VendorMasters/UpdateVendor";

        public const string ADDVENDORCONTACT = "VendorMasters/AddVendorContact";

        public const string ADDVENDORFINANCIAL = "VendorMasters/add_vendor_legal_financial";

        public const string UPDATE_VENDOR_FINANCIAL = "VendorMasters/update_vendor_legal_financial";

        public const string ADD_VENDOR_PAYMENT = "VendorMasters/add_vendor_payment_terms";

        public const string ADD_VENDOR_DOCUMENT = "VendorMasters/add_vendor_document";

        public const string GET_VENDOR_DETAILS_ID = "VendorMasters/get_vendor_detail_by_id";
    }
}
