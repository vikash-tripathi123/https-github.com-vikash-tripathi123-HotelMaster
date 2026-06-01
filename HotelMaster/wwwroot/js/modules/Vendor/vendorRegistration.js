
let vendorId = 0; 
$(document).ready(function () {

});
//document.querySelector("#btnSubmit").addEventListener("click", addVendor);


function addVendor() {
    debugger
    var form = $("#vendorBusinessForm");

    form.validate().settings.ignore = [];
    

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

        Business_Name: $("#businessName").val(),

        Legal_Name: $("#legalName").val(),

        Services: $("#Service").val(),

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

    console.log(JSON.stringify(payload));

    return $.ajax({

        url: '/Vendor/AddVendor',

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
    debugger
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

function addVendorFinancial() {
    
    var form = $("#vendorFinancialForm");

    if (!form.valid()) {
        return false;
    }


    var payload = {

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
        url: '/Vendor/AddVendorFinancial',

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

function addVendorPayment() {

    debugger
    var form = $("#vendorPaymentForm");

    if (!form.valid()) {
        return false;
    }


    var payload = {

        VendorId: vendorId,
        TenantId: 1,

        Terms: $('input[name="vendorPaymentRequest.Terms"]:checked').val(),

        CreditType: $('select[name="vendorPaymentRequest.CreditType"]').val(),

        CreditDays: $('input[name="vendorPaymentRequest.CreditDays"]').val()
    };



    console.log(payload, 'payload');

    return $.ajax({
        url: '/Vendor/AddVendorPayment',

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

function addVendorDocument() {
    debugger
    let isValid = validateFiles();
    if (!isValid) {
        return; 
    }
    let formData = new FormData();

    let tenantId = 1;   // or get dynamically
     vendorId = vendorId; // or get dynamically

    let index = 0;

    //  loop through all file inputs inside form

    // ✅ loop through all file inputs
    $("#vendorDocumentForm input[type='file']").each(function () {

        if (this.files.length > 0) {

            let file = this.files[0];
            let docType = this.id; // pan, gstCertificate, etc.

            formData.append(`[${index}].TenantId`, tenantId);
            formData.append(`[${index}].VendorId`, vendorId);
            formData.append(`[${index}].DocumentType`, 1);
            formData.append(`[${index}].DocumentName`, file.name);
            formData.append(`[${index}].FilePath`, file); // ✅ important

            index++;
        }
    });

    if (index === 0) {
        alert("Please upload at least one document");
        return;
    }

    return $.ajax({
        url: '/Vendor/AddVendorDocuments',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        }
        //success: function (res) {
        //    consoel.log(res)
        //    if (res.IsError == false) {
              
        //        alert("Uploaded successfully ✅");
        //    }
        //    else {
        //        alert("Error uploading files");
        //    }
        //},
        //error: function () {
          
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

function validateFiles() {

    let isValid = true;

    function setError(inputId, errorId, message) {
        let input = $("#" + inputId);

        if (!input[0].files.length) {
            $("#" + errorId).text(message);

            input.addClass("input-validation-error"); // ✅ important
            isValid = false;
        } else {
            $("#" + errorId).text("");
            input.removeClass("input-validation-error");
        }
    }

    setError("pan", "panError", "PAN is required");
    setError("hotelLicense", "hotelLicenseError", "Hotel License is required");
    setError("gstCertificate", "gstCertificateError", "GST Certificate is required");
    setError("cancelCheque", "cancelChequeError", "Cancelled Cheque is required");

    return isValid;
}

async function validateForms() {
    debugger
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