

$(document).ready(function () {

});
document.querySelector("#btnSubmit").addEventListener("click", addVendor); 

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

        Business_Type: $("input[name='Business_Type']:checked").val(),

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

        error: function (xhr) {

            console.log(xhr);

            console.log(xhr.responseText);

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

    $("#contactContainer").append(newRow);

    // ✅ 🔴 CRITICAL FIX
    $("#vendorContactForm").removeData("validator");
    $("#vendorContactForm").removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse("#vendorContactForm");
}
``

    // ✅ remove row
    $(document).on("click", ".removeRow", function () {
        $(this).closest(".contact-row").remove();
    });

document.querySelector("#btnSubmit").addEventListener("click", addVendorContact);
function addVendorContact() {

    var form = $("#vendorContactForm");

    if (!form.valid()) {
        return false;
    }

   

    //$.ajax({

    //    url: '/Vendor/AddVendor',

    //    type: 'POST',

    //    contentType: 'application/json',

    //    data: ,
    //    headers: {

    //        'RequestVerificationToken':
    //            $('input[name="__RequestVerificationToken"]').val()
    //    },


    //    success: function (response) {

    //        console.log(response);

    //        alert("Vendor Added Successfully");

    //    },

    //    error: function (xhr) {

    //        console.log(xhr);

    //        console.log(xhr.responseText);

    //    }
    //});

}