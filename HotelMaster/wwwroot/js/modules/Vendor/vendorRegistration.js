

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

    $.ajax({

        url: '/Vendor/AddVendor',

        type: 'POST',

        contentType: 'application/json',

        data: JSON.stringify(payload),
        headers: {

            'RequestVerificationToken':
                $('input[name="__RequestVerificationToken"]').val()
        },


        success: function (response) {

            console.log(response);
            if (response.statusCode > 0) {
                alert("Vendor Added Successfully");
            }  
            else {
                alert("vendor not added")
            }
           

        },

        error: function (error) {

            console.log(error);
            if (error.status == 409) {
                alert(error.responseJSON.errors
                )
            }
            console.log(error.responseText);
            console.log(error.responseJSON.errors);

        }
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

document.querySelector("#btnSubmit").addEventListener("click", addVendorDocument);

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
            Designation: row.find("select[name*='Designation']").val()
        };

        contacts.push(contact);
    });



    $.ajax({
        url: "/Vendor/AddVendorContact",
        type: "POST",
        contentType: "application/json",
        data: contacts,
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        },
        success: function (res) {
            console.log("Success", res);
        },
        error: function (err) {
            console.log("Error", err);
        }
    });


}

function addVendorFinancila() {
    
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
        VendorId: 3
    };
    

    console.log(payload, 'payload'); 

    $.ajax({
        url: '/Vendor/AddVendorFinancial',

        type: 'POST',

        contentType: 'application/json',
        data: JSON.stringify(payload),
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        },
        success: function (response) {
            console.log(response);
         //   if()
        },
        error: function (err) {
            console.log(err);
        }
    });

}

function addVendorPayment() {

    debugger
    var form = $("#vendorPaymentForm");

    if (!form.valid()) {
        return false;
    }


    var payload = {

        TenantId: 1,
        VendorId: 3,

        Terms: $('input[name="vendorPaymentRequest.Terms"]:checked').val(),

        CreditType: $('select[name="vendorPaymentRequest.CreditType"]').val(),

        CreditDays: $('input[name="vendorPaymentRequest.CreditDays"]').val()
    };



    console.log(payload, 'payload');

    $.ajax({
        url: '/Vendor/AddVendorPayment',

        type: 'POST',

        contentType: 'application/json',
        data: JSON.stringify(payload),
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        },
        success: function (response) {
            console.log(response);
            //   if()
        },
        error: function (err) {
            console.log(err);
        }
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
    let vendorId = 3; // or get dynamically

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

    $.ajax({
        url: '/Vendor/AddVendorDocuments',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        },
        success: function (res) {
            consoel.log(res)
            if (res.IsError == false) {
              
                alert("Uploaded successfully ✅");
            }
            else {
                alert("Error uploading files");
            }
        },
        error: function () {
          
        }
    });

}


function triggerFile(id) {
    document.getElementById(id).click();
}


document.querySelectorAll('input[type="file"]').forEach(input => {

    input.addEventListener('change', function () {

        let file = this.files[0];
        let preview = document.getElementById(this.id + "Preview");

        if (!file) {
            preview.style.display = "none";
            preview.innerHTML = "";
            return;
        }

        // ✅ Validation
        const allowed = ["image/jpeg", "image/png", "application/pdf"];
        const maxSize = 2 * 1024 * 1024;

        if (!allowed.includes(file.type)) {
            alert("Only JPG, PNG, PDF allowed");
            this.value = "";
            return;
        }

        if (file.size > maxSize) {
            alert("Max size is 2MB");
            this.value = "";
            return;
        }

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

    // PAN
    if (!$("#pan")[0].files.length) {
        $("#panError").text("PAN is required");
        isValid = false;
    } else {
        $("#panError").text("");
    }

    // Hotel License
    if (!$("#hotelLicense")[0].files.length) {
        $("#hotelLicenseError").text("Hotel License is required");
        isValid = false;
    } else {
        $("#hotelLicenseError").text("");
    }

    // GST Certificate
    if (!$("#gstCertificate")[0].files.length) {
        $("#gstCertificateError").text("GST Certificate is required");
        isValid = false;
    } else {
        $("#gstCertificateError").text("");
    }

    // Cancel Cheque
    if (!$("#cancelCheque")[0].files.length) {
        $("#cancelChequeError").text("Cancelled Cheque is required");
        isValid = false;
    } else {
        $("#cancelChequeError").text("");
    }

    return isValid;
}
