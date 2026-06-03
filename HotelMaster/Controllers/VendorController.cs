using HotelMaster.BusinessServices.Interfaces;
using HotelMaster.BusinessServices.Services;
using HotelMaster.Models;
using HotelMaster.Models.RequestModels.VendorModel;
using HotelMaster.Models.ResponseModels.MasterModels;
using HotelMaster.Models.ResponseModels.VendorModels;
using HotelMaster.Models.ViewModels.VendorModels;
using Microsoft.AspNetCore.Mvc;

namespace HotelMaster.Controllers
{
    public class VendorController : Controller
    {
        private readonly IVendorServices _verndorService;
        private readonly IMasterServices _masterServices;
        public VendorController(IVendorServices vendorServices, IMasterServices masterServices)
        {
            _verndorService = vendorServices;   
            _masterServices = masterServices;
        }
        public async Task<IActionResult> Index()
        {
            // ApiResponse<List<StateResponse>> response = await _masterServices.GetStateList();
           

            return View();
        }


        public async Task<IActionResult> registration() {




            var model = new VendorViewModels();

            model.vendorContactRequest = new List<VendorContactRequest>();

            // ✅ Always add at least one row
            model.vendorContactRequest.Add(new VendorContactRequest());

            return View(model);


        }
 
        [HttpPost]
        public async Task<IActionResult> GetVendorList(VendorRequestFilter filter)
        {
            filter.TenantId = 1; 
            ApiResponse<List<VendorListResponse>> response = await _verndorService.GetVendorList(filter);

            return Json(response); 
         
        }


        [HttpGet]
        public async Task<IActionResult> StateList()
        {
            ApiResponse<List<StateResponse>> response = await _masterServices.GetStateList();

            return View("Index", response.Data);
        }


        [HttpPost]
        public async Task<IActionResult> AddVendor([FromBody]VendorPersonalBusinessRequest request)
        {     
           
            if (request == null)
            {
                return BadRequest("Invalid request");   // ✅ return 400
            }

            var response = await _verndorService.AddVendor(request);
             
            return StatusCode(response.StatusCode, response);

        }

        [HttpPost]
        public async Task<IActionResult> AddVendorContact([FromBody] List<VendorContactRequest> request)
        {

            if (request == null)
            {
                return BadRequest("Invalid request");   // ✅ return 400
            }

            var response = await _verndorService.AddVendorContact(request);

            return StatusCode(200, request);

        }


        [HttpPost]
        public async Task<IActionResult> AddVendorFinancial([FromBody] VendorFinancialiRequest request)
        {

            if (request == null)
            {
                return BadRequest("Invalid request");   // ✅ return 400
            }

            var response = await _verndorService.AddVendorFinancial(request);

            return StatusCode(response.StatusCode, response);

        }


        [HttpPost]
        public async Task<IActionResult> AddVendorPayment([FromBody] VendorPaymentRequest request)
        {

            if (request == null)
            {
                return BadRequest("Invalid request");   // ✅ return 400
            }

            var response = await _verndorService.AddVendorPayment(request);

            return StatusCode(response.StatusCode, response);

        }

        [HttpPost]
        public async Task<IActionResult> AddVendorDocuments([FromForm] List<VendorDocumentRequest> request)
        {

     
            var response = await _verndorService.AddVendorDocument(request);

            return StatusCode(response.StatusCode, response);

        }

        [HttpGet]
        public async Task<IActionResult> GetVendorDetailById( int vednorId)
        {

            var response = await _verndorService.GetVendorDetailById(vednorId);

            return Ok(response);
        }
    }
}
