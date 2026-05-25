

$(document).ready(function () {

    alert("jquery loaded");

    $("#vendorBusinessForm").submit(function (e) {

    ///    alert("submit working");

        e.preventDefault();

    });
});
document.querySelector("#btnSubmit").addEventListener("click", addVendor); 

function addVendor() {

    var form = $("#vendorBusinessForm");

    if (!form.valid()) {
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

            alert("Vendor Added Successfully");

        },

        error: function (xhr) {

            console.log(xhr);

            console.log(xhr.responseText);

        }
    });
}

//$("#vendorBusinessForm").submit(function (e) {
//    debugger
//    e.preventDefault();

//    if (!$(this).valid()) {
//        return false;
//    }

//    $.ajax({
//        url: '/Vendor/registration',
//        type: 'POST',
//        data: $(this).serialize(),
//        success: function (response) {

//            console.log(response);

//        },
//        error: function (error) {

//            console.log(error);

//        }
//    });

//});