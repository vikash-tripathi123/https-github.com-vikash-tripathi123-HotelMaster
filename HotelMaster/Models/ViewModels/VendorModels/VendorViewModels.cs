using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.MasterModels;
using HotelMaster.Views.Shared.Partial;

using System.Reflection;

namespace HotelMaster.Models.ViewModels.VendorModels
{
    public class VendorViewModels
    {
        public VendorPersonalBusinessRequest personalBusinessRequest { get; set; }
        public List<VendorContactRequest> vendorContactRequest { get; set; }
        public VendorFinancialiRequest vendorFinancialiRequest { get; set; }
        public  VendorPaymentRequest vendorPaymentRequest { get; set; }

        public VendorDocumentRequest vendorDocumentRequest { get; set; }

    }
}
