
let vendorId = 0; 
let vendorCode = ''; 
let currentStep = 1;
$(document).ready(function () {
    $('#services').select2({
        placeholder: "Select Services"
    });

    // ✅ Trigger validation on change
    $('#services').on('change', function () {
        $(this).valid();
    });

    getStoredId();

});



document.querySelector("#vendorBusinessSaveDraft").addEventListener("click", vendorBusiness);

function addVendor() {
    
    var form = $("#vendorBusinessForm");

    form.validate().settings.ignore = [];
   let url = ''
    if (vendorId) {
        url = '/Vendor/UpdateVendor?vendorId=' + vendorId
    }
    else {
        url = '/vendor/addVendor'
    } 
    
    if (!form.valid()) {

        let firstError = $(".input-validation-error:first");

        if (firstError.length > 0) {

            // ✅ find accordion/card
            let card = firstError.closest(".card");

            // ✅ open correct accordion
            $(".card").removeClass("active");
            card.addClass("active");

            // ✅ focus + scroll
            setTimeout(() => {
                firstError.focus();

                $('html, body').animate({
                    scrollTop: firstError.offset().top - 120
                }, 400);

            }, 200); // wait for accordion animation
        }

        return false;


    }

    const payload = {

//        vendorId: vendorId,

        Business_Name: $("#businessName").val(),

        Legal_Name: $("#legalName").val(),

        //Services: $("#services").val(),

        Services: $("#services").val() || [],

        Star_Rating: $("#StarRating").val(),

        AddressLine1: $("#Address1").val(),

        AddressLine2: $("#Address2").val(),

        Country: $("#Country").val(),

        State: $("#State").val(),

        City: $("#City").val(),

        Pin_Code: $("#Pin").val(),

        Business_Type:1,

        UserName: "Admin"
    };
    console.log(payload,'payload')
    console.log(JSON.stringify(payload));

    return $.ajax({

        url: url,

        type: 'POST',

        contentType: 'application/json',

        data: JSON.stringify(payload),
        headers: {

            'RequestVerificationToken':
                $('input[name="__RequestVerificationToken"]').val()
        },

     
        //success: function (response) {

        //    console.log(response);
        //    if (response.statusCode > 0) {
        //        alert("Vendor Added Successfully");
        //    }  
        //    else {
        //        alert("vendor not added")
        //    }
           

        //},

        //error: function (error) {

        //    console.log(error);
        //    if (error.status == 409) {
        //        alert(error.responseJSON.errors
        //        )
        //    }
        //    console.log(error.responseText);
        //    console.log(error.responseJSON.errors);

        //}
    });
}

//document.querySelector("#contactrow").addEventListener("click", addContactRow);

$(document).on("click", ".additems", addContactRow);

function addContactRow() {

    let index = $("#contactContainer .contact-row").length;

    let newRow = $(".contact-row:first").clone();

    // clear values
    newRow.find("input").val("");
    newRow.find("select").val("");

    // update name + id
    newRow.find("input, select").each(function () {

        let name = $(this).attr("name");
        let id = $(this).attr("id");

        if (name) {
            name = name.replace(/\d+/, index);
            $(this).attr("name", name);
        }

        if (id) {
            id = id.replace(/\d+/, index);
            $(this).attr("id", id);
        }

    });

    // update validation span
    newRow.find("span").each(function () {

        let valmsg = $(this).attr("data-valmsg-for");

        if (valmsg) {
            valmsg = valmsg.replace(/\d+/, index);
            $(this).attr("data-valmsg-for", valmsg);
        }

        $(this).text("");
    });

    // ✅ ADD REMOVE BUTTON manually if not present
    if (newRow.find(".removeRow").length === 0) {
        newRow.append('<button type="button" class="removeRow">Remove</button>');
    }

    $("#contactContainer").append(newRow);

    // rebind validation
    $("#vendorContactForm").removeData("validator");
    $("#vendorContactForm").removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse("#vendorContactForm");
}

  // ✅ remove row
 $(document).on("click", ".removeRow", function () {
        $(this).closest(".contact-row").remove();
    });

document.querySelector("#btnSubmit").addEventListener("click", validateForms);

function addVendorContact() {
    
    var form = $("#vendorContactForm");

    if (!form.valid()) {
        return false;
    }


    let contacts = [];

    $("#contactContainer .contact-row").each(function () {

        let row = $(this);

        let contact = {
            FullName: row.find("input[name*='FullName']").val(),
            Phone: row.find("input[name*='Phone']").val(),
            Email: row.find("input[name*='Email']").val(),
            Department: row.find("select[name*='Department']").val(),
            Designation: row.find("select[name*='Designation']").val(),
            VendorId: vendorId,
            TenantId : 1
        };

        contacts.push(contact);
    });

    console.log(contacts, 'contact payload'); 

    return $.ajax({
        url: "/Vendor/AddVendorContact",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(contacts),
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        }
        
        //success: function (res) {
        //    console.log("Success", res);
        //},
        //error: function (err) {
        //    console.log("Error", err);
        //}
    });


}

function addVendorFinancial(vendorLegalFinancialid = 0) {
    
    var form = $("#vendorFinancialForm");

    let url = '';
    if ($(vendorLegalFinancialid>0)) {
        url = '/Vendor/UpdateVendorFinancial?vendorLegalFinancialid=' + vendorLegalFinancialid;
    }
    else {
        url = '/Vendor/AddVendorFinancial'; 
    }

    if (!form.valid()) {
        return false;
    }


    var payload = {
        vendorLegalFinancialid: $('#financialId')?.val() || 0,
        legalName: $('input[name="vendorFinancialiRequest.legalName"]').val(),
        BankName: $('input[name="vendorFinancialiRequest.BankName"]').val(),
        AccountNumber: $('input[name="vendorFinancialiRequest.AccountNumber"]').val(),
        Ifsc_Code: $('input[name="vendorFinancialiRequest.Ifsc_Code"]').val(),
        Applicable_tds_percent: $('input[name="vendorFinancialiRequest.Applicable_tds_percent"]').val(),
        Pan_Name_Holder: $('input[name="vendorFinancialiRequest.Pan_Name_Holder"]').val(),
        Pan_number: $('input[name="vendorFinancialiRequest.Pan_number"]').val(),
        Gst_Registered_Name: $('input[name="vendorFinancialiRequest.Gst_Registered_Name"]').val(),
        Gst_in_number: $('input[name="vendorFinancialiRequest.Gst_in_number"]').val(),
        Msme_certificate_holder_name: $('input[name="vendorFinancialiRequest.Msme_certificate_holder_name"]').val(),
        Msme_registration_number: $('input[name="vendorFinancialiRequest.Msme_registration_number"]').val(), 
        Tan_number: 'DELT00001U',
        VendorId: vendorId,
        TenantId: 1
    };
    

    console.log(payload, 'payload'); 

    return $.ajax({
        url: url,

        type: 'POST',

        contentType: 'application/json',
        data: JSON.stringify(payload),
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        }
        //success: function (response) {
        //    console.log(response);
        // //   if()
        //},
        //error: function (err) {
        //    console.log(err);
        //}
    });

}

function addVendorPayment(paymentId = 0) {

    
    var form = $("#vendorPaymentForm");

    if (!form.valid()) {
        return false;
    }

    let url = ''
    if (paymentId) {
        url = '/Vendor/UpdateVendorPayment?VendorPaymentTermsId=' + paymentId;
    }
    else {
        url = '/Vendor/AddVendorPayment'; 
    }

    var payload = {

        VendorPaymentTermsId: parseInt(paymentId),
        VendorId: parseInt(vendorId),
        TenantId: 1,

        Terms: $('input[name="vendorPaymentRequest.Terms"]:checked').val(),

        CreditType: $('select[name="vendorPaymentRequest.CreditType"]').val(),

        CreditDays: parseInt($('input[name="vendorPaymentRequest.CreditDays"]').val())
    };



    console.log(payload, 'payload');

    return $.ajax({
        url: url,

        type: 'POST',

        contentType: 'application/json',
        data: JSON.stringify(payload),
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        }
        //success: function (response) {
        //    console.log(response);
        //    //   if()
        //},
        //error: function (err) {
        //    console.log(err);
        //}
    });

}

//function addVendorDocument() {
//    debugger
//    let isValid = validateFiles();
//    if (!isValid) {
//        return;
//    }
//    let formData = new FormData();

//    let tenantId = 1;   // or get dynamically
//     vendorId = vendorId; // or get dynamically

//    let index = 0;

//    //  loop through all file inputs inside form

//    // ✅ loop through all file inputs
//    $("#vendorDocumentForm input[type='file']").each(function () {

//        if (this.files.length > 0) {

//            let file = this.files[0];
//            let docType = this.id; // pan, gstCertificate, etc.

//            formData.append(`[${index}].TenantId`, tenantId);
//            formData.append(`[${index}].VendorId`, vendorId);
//            formData.append(`[${index}].DocumentType`, 1);
//            formData.append(`[${index}].DocumentName`, file.name);
//            formData.append(`[${index}].FilePath`, file); // ✅ important

//            index++;
//        }
//    });

//    if (index === 0) {
//        alert("Please upload at least one document");
//        return;
//    }

//    return $.ajax({
//        url: '/Vendor/AddVendorDocuments',
//        type: 'POST',
//        data: formData,
//        processData: false,
//        contentType: false,
//        headers: {
//            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
//        }
//        //success: function (res) {
//        //    consoel.log(res)
//        //    if (res.IsError == false) {

//        //        alert("Uploaded successfully ✅");
//        //    }
//        //    else {
//        //        alert("Error uploading files");
//        //    }
//        //},
//        //error: function () {

//        //}
//    });

//}

function addVendorDocument() {
    
    let isValid = validateFiles();
    if (!isValid) return;

    let formData = new FormData();

    let tenantId = 1;
    let index = 0;



    $("#vendorDocumentForm input[type='file']").each(function () {
        debugger
        let file = this.files[0];
        let inputId = this.id;
        let docId = getDocId(inputId);
        console.log(docId, 'docId')

        // ✅ Skip unchanged items
        if (!isChanged(inputId)) return;

        formData.append(`[${index}].DocumentID`, docId > 0 ? docId : null);
        formData.append(`[${index}].TenantId`, 1);
        formData.append(`[${index}].VendorId`, vendorId);
        formData.append(`[${index}].DocumentType`, getDocumentTypeId(inputId));

        if (file) {
            formData.append(`[${index}].FilePath`, file);
            formData.append(`[${index}].DocumentName`, vendorCode + '' + inputId);
        }

        index++;
    });

 
    if (index === 0) {
        alert("No new files selected (existing files already present)");
        return;
    }

  return  $.ajax({
        url: '/Vendor/AddVendorDocuments',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        }
        //success: function (res) {
        //    console.log(res);
        //    alert("Uploaded successfully ✅");
        //}
    });
}
function triggerFile(id) {
    document.getElementById(id).click();
}


document.querySelectorAll('input[type="file"]').forEach(input => {

    input.addEventListener('change', function () {

        let file = this.files[0];
        let preview = document.getElementById(this.id + "Preview");
        let errorSpan = document.getElementById(this.id + "Error"); // ✅ error element

        if (!file) {
            preview.style.display = "none";
            preview.innerHTML = "";

            // ✅ show required error again
            if (errorSpan) errorSpan.innerText = "This file is required";
            this.classList.add("input-validation-error");

            return;
        }

        // ✅ Validation
        const allowed = ["image/jpeg", "image/png", "application/pdf"];
        const maxSize = 2 * 1024 * 1024;

        if (!allowed.includes(file.type)) {
            alert("Only JPG, PNG, PDF allowed");
            this.value = "";

            if (errorSpan) errorSpan.innerText = "Invalid file type";
            this.classList.add("input-validation-error");

            return;
        }

        if (file.size > maxSize) {
            alert("Max size is 2MB");
            this.value = "";

            if (errorSpan) errorSpan.innerText = "File size exceeds 2MB";
            this.classList.add("input-validation-error");

            return;
        }

        // ✅ SUCCESS → clear error
        if (errorSpan) errorSpan.innerText = "";
        this.classList.remove("input-validation-error");

        // ✅ Show preview
        preview.style.display = "block";
        preview.innerHTML =
            "✔ " + file.name + " (" + Math.round(file.size / 1024) + " KB)";
    });


});

function validateDocuments() {

    let required = ["pan", "hotelLicense", "gstCertificate", "cancelCheque"];

    for (let id of required) {
        if (!document.getElementById(id).files.length) {
            alert("Please upload " + id);
            return false;
        }
    }

    alert("All documents valid ✅");
    return true;
}

//function validateFiles() {

//    let isValid = true;

//    function setError(inputId, errorId, message) {
//        let input = $("#" + inputId);

//        if (!input[0].files.length) {
//            $("#" + errorId).text(message);

//            input.addClass("input-validation-error"); // ✅ important
//            isValid = false;
//        } else {
//            $("#" + errorId).text("");
//            input.removeClass("input-validation-error");
//        }
//    }

//    setError("pan", "panError", "PAN is required");
//    setError("hotelLicense", "hotelLicenseError", "Hotel License is required");
//    setError("gstCertificate", "gstCertificateError", "GST Certificate is required");
//    setError("cancelCheque", "cancelChequeError", "Cancelled Cheque is required");

//    return isValid;
//}

function validateFiles() {

    let isValid = true;

    function setError(inputId, errorId, message, docType) {

        let input = $("#" + inputId);
        let hasFile = input[0].files.length > 0;
        let exists = hasExistingDoc(docType);

        if (!hasFile && !exists) {
            $("#" + errorId).text(message);
            input.addClass("input-validation-error");
            isValid = false;
        } else {
            $("#" + errorId).text("");
            input.removeClass("input-validation-error");
        }
    }

    setError("pan", "panError", "PAN is required", "PAN Card");
    setError("hotelLicense", "hotelLicenseError", "Hotel License required", "Hotel License");
    setError("gstCertificate", "gstCertificateError", "GST required", "GST Certificate");
    setError("cancelCheque", "cancelChequeError", "Cancelled cheque required", "Cancelled Cheque");

    return isValid;
}

async function validateForms() {
    
    var vendorBusinessForm = $("#vendorBusinessForm");
    var vendorContactForm = $("#vendorContactForm");
    var vendorFinancialForm = $("#vendorFinancialForm");
    var vendorPaymentForm = $("#vendorPaymentForm");
    vendorBusinessForm.validate().settings.ignore = [];
    vendorContactForm.validate().settings.ignore = [];
    vendorFinancialForm.validate().settings.ignore = [];
    vendorPaymentForm.validate().settings.ignore = [];

    if (!vendorBusinessForm.valid()) {
        let firstError = $(".input-validation-error:first");

        if (firstError.length > 0) {

            // ✅ find accordion/card
            let card = firstError.closest(".card");

            // ✅ open correct accordion
            $(".card").removeClass("active");
            card.addClass("active");

            // ✅ focus + scroll
            setTimeout(() => {
                firstError.focus();

                $('html, body').animate({
                    scrollTop: firstError.offset().top - 120
                }, 400);

            }, 200); // wait for accordion animation
        }

        return false;
    }
    else if (!vendorContactForm.valid()) {

        let firstError = $(".input-validation-error:first");

        if (firstError.length > 0) {

            // ✅ find accordion/card
            let card = firstError.closest(".card");

            // ✅ open correct accordion
            $(".card").removeClass("active");
            card.addClass("active");

            // ✅ focus + scroll
            setTimeout(() => {
                firstError.focus();

                $('html, body').animate({
                    scrollTop: firstError.offset().top - 120
                }, 400);

            }, 200); // wait for accordion animation
        }

        return false;
    }
    else if (!vendorFinancialForm.valid()) {
        let firstError = $(".input-validation-error:first");

        if (firstError.length > 0) {

            // ✅ find accordion/card
            let card = firstError.closest(".card");

            // ✅ open correct accordion
            $(".card").removeClass("active");
            card.addClass("active");

            // ✅ focus + scroll
            setTimeout(() => {
                firstError.focus();

                $('html, body').animate({
                    scrollTop: firstError.offset().top - 120
                }, 400);

            }, 200); // wait for accordion animation
        }

        return false;
    }
    else if (!vendorPaymentForm.valid()) {
        let firstError = $(".input-validation-error:first");

        if (firstError.length > 0) {

            // ✅ find accordion/card
            let card = firstError.closest(".card");

            // ✅ open correct accordion
            $(".card").removeClass("active");
            card.addClass("active");

            // ✅ focus + scroll
            setTimeout(() => {
                firstError.focus();

                $('html, body').animate({
                    scrollTop: firstError.offset().top - 120
                }, 400);

            }, 200); // wait for accordion animation
        }

        return false;
    }
    let isValid = validateFiles();
    if (!isValid) {


        let firstError = $(".input-validation-error:first");

        if (firstError.length > 0) {

            let card = firstError.closest(".card");

            $(".card").removeClass("active");
            card.addClass("active");

            setTimeout(() => {
                firstError.focus();

                $('html, body').animate({
                    scrollTop: firstError.offset().top - 120
                }, 400);
            }, 200);
        }

        return false;



    }
    //addVendor();
    //addVendorContact();
    //addVendorFinancila();
    //addVendorPayment();
    //addVendorDocument();

    try {

        const vendor = await addVendor();
        console.log(vendor)
        vendorId = vendor.data?.vendorId || 0;


        if (vendorId != 0) {

            const vendorContact = await addVendorContact();

            const vendorFinancila = await addVendorFinancial();

            const vensorPayment = await addVendorPayment();

            const vendorDocument = await addVendorDocument();

            alert("Vendor registeres successfully");
            window.location.href = '/Vendor'
        }
    }
    catch (error) {

        //  handleAjaxError(error);
        console.log(error)
        alert(error);
    }


}

async function vendorBusiness() {
    try {
        const vendor = await addVendor();
        console.log(vendor);

        vendorId = vendor?.data?.vendorId || 0;
        console.log("Vendor ID:", vendorId);
      //  alert(vendor?.message)
    } catch (error) {
        console.error(error);
        alert(error.message || "An error occurred while adding vendor");
    }
}

async function vendorFinancial() {
    try {
        
        let financialId = $('#financialId')?.val() || 0;
        const vendor = await addVendorFinancial(financialId);
        console.log(vendor);

        //vendorId = vendor?.data?.vendorId || 0;
        console.log("Vendor ID:", vendorId);
          alert(vendor?.message)
    } catch (error) {
        console.error(error);
        alert(error.message || "An error occurred while adding vendor");
    }
}

async function vendorPayment() {

    try {
        
        let paymentId = $('#paymentId')?.val() || 0;
        const vendor = await addVendorPayment(paymentId);
        console.log(vendor);

        //vendorId = vendor?.data?.vendorId || 0;
        console.log("Vendor ID:", vendorId);
        alert(vendor?.message)
    } catch (error) {
        console.error(error);
        alert(error.message || "An error occurred while adding vendor");
    }

}

async function vendorDocuments() {
    try {
        debugger
        
        const vendor = await addVendorDocument()
        console.log(vendor);


        vendor.data.forEach(doc => {
            debugger
            switch (doc.documentType) {
                
                case 1:
                    $("#panDocId").val(doc.documentId);
                    break;

                case 6:
                    $("#hotelLicenseDocId").val(doc.documentId);
                    break;

                case 7:
                    $("#gstCertificateDocId").val(doc.documentId);
                    break;

                case 12:
                    $("#cancelChequeDocId").val(doc.documentId);
                    break;
            }
        });

        // ✅ clear files after success
       // $("#vendorDocumentForm input[type='file']").val("");

        alert("Saved successfully ✅");



        //vendorId = vendor?.data?.vendorId || 0;
        //console.log("Vendor ID:", vendorId);
       // alert(vendor?.message)
    } catch (error) {
        console.error(error);
        alert(error.message || "An error occurred while adding vendor");
    }
}
function getStoredId() {
    
    let raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        console.log("No data found");
        return null;
    }

    let data;

    // ✅ Safe parse
    try {
        data = JSON.parse(raw);
    } catch {
        console.log("Invalid storage format");
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }

    // ✅ Decode
    let id = decode(data.v);
    vendorId = id
    // ✅ Validate ID
    if (!id || isNaN(id)) {
        console.log("Invalid ID after decode");
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }

    gerVendor(parseInt(id)); // ✅ ensure number
}
function gerVendor(vendorID) {

    let payload = {
        vednorId: parseInt(vendorID)
    }
    $.ajax({
        url: '/Vendor/GetVendorDetailById',
        type: 'GET',
        contentType: 'application/json',
        data: payload, // ensure vendorID is sent as JSON

        success: function (response) {
            //console.log(response);
            
            if (response.statusCode > 0) {
            //    alert("Vendor fetch Successfully");
                if (response.data) {
                    vendorCode = response.data.vendorCode;
                    bindVendorData(response.data.vendorBasicDetail);
                    bindContactData(response.data.vendorContacts);
                    bindFinancialData(response.data.vendorLegalFInancialDetail);
                    bindVendorPaymentData(response.data.vendorPaymentTerms);
                    bindDocuments(response.data.vendorDocuments);
                }
               
            } else {
                alert("Vendor not fetch");
            }
        },

        error: function (error) {
            console.log(error);
            if (error.status === 409) {
                alert(error.responseJSON.errors);
            }
            console.log(error.responseText);
            console.log(error.responseJSON.errors);
        }
    });
}
function vendorFinancialIsDraft() {

}
function bindVendorData(data) {
    console.log(data,'data')
    if (!data) return;

    // ✅ Text fields
    $("#businessName").val(data.businessName || "");
    $("#legalName").val(data.legalName || "");

    // ✅ Star Rating
    $("#StarRating").val(data.starRating).trigger("change");

    // ✅ Services
    bindServices(data.serviceType);

    // ✅ Business Type (FIXED)
    if (data.businessType) {

        let type = data.businessType.toLowerCase().trim();
        let value = null;

        if (type.includes("partnership")) value = "1";
        else if (type.includes("private")) value = "2";
        else if (type.includes("llp")) value = "3";
        else if (type.includes("proprietor")) value = "4";

        $("input[name='personalBusinessRequest.Business_Type']").prop("checked", false);

        if (value) {
            $("input[name='personalBusinessRequest.Business_Type'][value='" + value + "']")
                .prop("checked", true);
        }
    }

    // ✅ Address
    $("#Address1").val(data?.addressLine1 || "");
    $("#Address2").val(data?.addressLine2 || "");

    // ✅ Location
    $("#Country").val(data.country).trigger("change");
    $("#State").val(data.state).trigger("change");
    $("#City").val(data.city).trigger("change");

    // ✅ Pin Code
    let match = data.fullAddress?.match(/\d{5,6}$/);
    if (match) {
        $("#Pin").val(match[0]);
    }
}
function bindContactData(data) {

    //  safety check
    if (!data || data.length === 0) {
        return;
    }

    let container = $("#contactContainer");
    let existingRows = container.find(".contact-row").length;

    // 1. Add rows if needed
    for (let i = existingRows; i < data.length; i++) {
        addContactRow(); // uses your existing function
    }

    //  2. Bind values
    data.forEach((item, index) => {

        // ✅ text inputs
        $(`[name='vendorContactRequest[${index}].FullName']`)
            .val(item.fullName || '');

        $(`[name='vendorContactRequest[${index}].Phone']`)
            .val(item.phone || '');

        $(`[name='vendorContactRequest[${index}].Email']`)
            .val(item.email || '');

        // ✅ dropdowns (with mapping)
        $(`[name='vendorContactRequest[${index}].Department']`)
            .val(getDeptValue(item.departmentName));

        $(`[name='vendorContactRequest[${index}].Designation']`)
            .val(getDesigValue(item.designationName));

        // ✅ optional hidden id (if exists)
        let idField = $(`[name='vendorContactRequest[${index}].VendorContactId']`);
        if (idField.length) {
            idField.val(item.vendorContactId || 0);
        }
    });
}
function bindFinancialData(data) {
    
    // ✅ safety check
    if (!data) {
        return;
    }

    $('#financialId').val(data.vendorLegalFinancialId);
    // ✅ Bank Details
    $("#vendorFinancialiRequest_legalName")
        .val(data.name || '');

    $("#vendorFinancialiRequest_BankName")
        .val(data.bankName || '');

    $("#vendorFinancialiRequest_AccountNumber")
        .val(data.accountNumber || '');

    $("#vendorFinancialiRequest_Ifsc_Code")
        .val(data.ifscCode || '');

    // ✅ TDS
    $("#vendorFinancialiRequest_Applicable_tds_percent")
        .val(data.tdsPercent || '');

    // ✅ PAN Details
    $("#vendorFinancialiRequest_Pan_Name_Holder")
        .val(data.panName || '');

    $("#vendorFinancialiRequest_Pan_number")
        .val(data.panNumber || '');

    // ✅ GST Details
    $("#vendorFinancialiRequest_Gst_Registered_Name")
        .val(data.gstName || '');

    $("#vendorFinancialiRequest_Gst_in_number")
        .val(data.gstNumber || '');

    // ✅ MSME Details
    $("#vendorFinancialiRequest_Msme_certificate_holder_name")
        .val(data.msmeName || '');

    $("#vendorFinancialiRequest_Msme_registration_number")
        .val(data.msmeNumber || '');
}
function bindVendorPaymentData(data) {
  
    console.log(data, 'payment data');

    if (!data) return;

    // ✅ 1. Hidden ID
    $("#paymentId").val(data.vendorPaymentTermsId);

    // ✅ 2. Terms (Radio Button)
    $("input[name='vendorPaymentRequest.Terms']").prop("checked", false);

    $("input[name='vendorPaymentRequest.Terms']").each(function () {
        let radioValue = $(this).val().toLowerCase();
        let apiValue = data.terms.toLowerCase();

        if (radioValue.includes(apiValue)) {
            $(this).prop("checked", true);
        }
    });

    // ✅ 3. Credit Type (Dropdown)
    $("#vendorPaymentRequest_CreditType")
        .val(data.creditType)
        .trigger("change");

    // ✅ 4. Credit Days
    $("#vendorPaymentRequest_CreditDays").val(data.creditDays);
}

let existingDocuments = [];
function bindDocuments(data) {

    existingDocuments = data;

    data.forEach(doc => {
        
        switch (doc.documentType) {

            case "PAN Card":
                $("#panDocId").val(doc.documentId);
                $("#panPreview").text(doc.documentName).show();
                $("#panPreview").css("display", "block");
                break;

            case "Hotel License":
                $("#hotelLicenseDocId").val(doc.documentId);
                $("#hotelLicensePreview").text(doc.documentName).show();
                break;

            case "GST Certificate":
                $("#gstCertificateDocId").val(doc.documentId);
                $("#gstCertificatePreview").text(doc.documentName).show();
                break;

            case "Cancelled Cheque":
                $("#cancelChequeDocId").val(doc.documentId);
                $("#cancelChequePreview").text(doc.documentName).show();
                break;
        }
    });
}
function getDocId(inputId) {
    
    switch (inputId) {
        case "pan": return $("#panDocId").val();
        case "hotelLicense": return $("#hotelLicenseDocId").val();
        case "gstCertificate": return $("#gstCertificateDocId").val();
        case "msmeCertificate": return $("#msmeCertificateDocId").val();
        case "aadharCard": return $("#aadharCardDocId").val();
        case "cancelCheque": return $("#cancelChequeDocId").val();
    }
}
function getDocumentTypeId(id) {
    
    switch (id) {
        case "pan": return 1;
        case "hotelLicense": return 6;
        case "gstCertificate": return 7;
        case "msmeCertificate": return 8;
        case "aadharCard": return 2;
        case "cancelCheque": return 12;
    }
}

// validation check for doc
function hasExistingDoc(docType) {
    return existingDocuments.some(d => d.documentType === docType);
}

function isChanged(inputId) {

    let file = $("#" + inputId)[0].files.length > 0;
    let docId = getDocId(inputId);

    // ✅ New upload
    if (file && (!docId || docId == 0)) return true;

    // ✅ Replace file
    if (file && docId > 0) return true;

    // ✅ No change
    return false;
}

//  Helper function (put this in your JS file)
function bindServices(serviceType) {

    if (!serviceType) return;

    let selectedValues = [];

    // ✅ If already array → ['14','1']
    if (Array.isArray(serviceType)) {
        selectedValues = serviceType;
    }

    // ✅ If string → "14,1"
    else if (typeof serviceType === "string") {
        selectedValues = serviceType.split(",");
    }

    // ✅ Final bind
    if (selectedValues.length > 0) {
        $("#services").val(selectedValues).trigger("change");
    }
}

function getDeptValue(name) {

    if (!name) return "";

    switch (name.trim()) {
        case "Reception":
            return "1";

        // 👉 add more mappings if needed
        // case "Sales": return "2";

        default:
            return "";
    }
}

function getDesigValue(name) {

    if (!name) return "";

    switch (name.trim()) {
        case "Hotel Manager":
            return "1";

        case "Resident Manager":
            return "2";

        // 👉 extend if more designations come
        // case "Assistant Manager": return "3";

        default:
            return "";
    }
}


//$(document).on("click", ".card-header", function (e) {
//    debugger
//    let clickedCard = $(this).closest(".card");
//    let clickedStep = parseInt(clickedCard.data("step"));

//    if (!isPreviousStepCompleted(clickedStep)) {

//        e.preventDefault();
//        e.stopPropagation();
//        e.stopImmediatePropagation();

//        alert("Please complete previous section first.");

//        return false;
//    }

//    // Open selected accordion
//    $(".tabsHotelInformation .card").removeClass("active");

//    clickedCard.addClass("active");
//});



//function isPreviousStepCompleted(step) {

//    switch (step) {

//        // Contact clicked -> validate Business
//        case 2:
//            return $("#vendorBusinessForm").valid();

//        // Financial clicked -> validate Business + Contact
//        case 3:
//            return $("#vendorBusinessForm").valid()
//                && $("#vendorContactForm").valid();

//        // Payment clicked -> validate Business + Contact + Financial
//        case 4:
//            return $("#vendorBusinessForm").valid()
//                && $("#vendorContactForm").valid()
//                && $("#vendorFinancialForm").valid();

//        // Document clicked -> validate all previous forms
//        case 5:
//            return $("#vendorBusinessForm").valid()
//                && $("#vendorContactForm").valid()
//                && $("#vendorFinancialForm").valid()
//                && $("#vendorPaymentForm").valid();

//        default:
//            return true;
//    }
//}
