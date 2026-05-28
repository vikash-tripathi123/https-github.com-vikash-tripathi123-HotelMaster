

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

document.querySelector("#btnSubmit").addEventListener("click", addVendorFinancila);
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
    debugger
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