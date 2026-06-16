


    const SECRET = "myAppKey123";  // small salt
    const STORAGE_KEY = "v";     // short key (less obvious)

    // ✅ Encode
    function encode(id) {
        return btoa(id + "|" + SECRET);
    }

    // ✅ Decode
    function decode(value) {
        try {
        let decoded = atob(value);
    return decoded.split("|")[0];
        } catch {
            return null;
        }
    }

    // ✅ Store ONLY ONE ID (overwrite)
    function saveId(id) {

        let data = {
        v: encode(id),
   // exp: Date.now() + (30 * 60 * 1000) // 30 min expiry
        };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // ✅ Get ID safely
    function getId() {
        let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    let data = JSON.parse(raw);

        // ✅ Check expiry
     //   if (Date.now() > data.exp) {
        localStorage.removeItem(STORAGE_KEY);
    return null;
       // }

    return decode(data.v);
    }

    // ✅ Clear
    function clearId() {
        localStorage.removeItem(STORAGE_KEY);
    }



//error handle 
function handleAjaxError(xhr) {

    let response = xhr?.responseJSON;

    let message = "Something went wrong.";
    let type = "failure";

    switch (xhr?.status) {

        case 400:

            if (Array.isArray(response?.errors)) {

                message = response.errors.join("<br>");
            }
            else {

                message =
                    response?.errors ||
                    response?.message ||
                    "Invalid request.";
            }

            break;

        case 401:

            type = "warning";

            message =
                response?.message ||
                "Your session has expired. Please login again.";

            break;

        case 403:

            type = "warning";

            message =
                response?.message ||
                "You do not have permission to perform this action.";

            break;

        case 404:

            message =
                response?.message ||
                "Requested resource was not found.";

            break;

        case 409:

            message =
                response?.message ||
                "Duplicate record found.";

            break;

        case 422:

            message =
                response?.message ||
                "Validation failed.";

            break;

        case 500:

            message =
                "Something went wrong. Please contact support.";

            break;

        default:

            message =
                response?.message ||
                "Unexpected error occurred.";
    }

    console.error({
        statusCode: xhr?.status,
        response
    });

    showToast(type, message);
}


//function showToast(type, message) {

//    $.myOwnUIToaster({

//        toasterId: '',

//        type: type,

//        header: getToastHeader(type),

//        body: message,

//        animateWhenShowAs: 'fade',

//        animateWhenHideAs: 'fade',

//        trigger: 'manual',

//        hoverOnTimeFreeze: true,

//        beforeWaitTimer: 100,

//        presenceTimer: 5000,

//        position: 'top-right',

//        autoClose: true,

//        clickOnClose: true
//    });
//}

// handle toastr
function showToast(type, message) {

    const toast = $.myOwnUIToaster({
        type: type,
        header: getToastHeader(type),
        body: message,
        trigger: 'auto',
        position: 'top-right',
        autoClose: true
    });

    toast.show();
}

function getToastHeader(type) {

    const headers = {

        success: "Success",

        failure: "Error",

        warning: "Warning",

        info: "Information"
    };

    return headers[type] || "Notification";
} 

function getState() {

   

    let url = '/Masters/StateList';
  




   // console.log(payload, 'payload');

    return $.ajax({
        url: url,

        type: 'GET',

        contentType: 'application/json',
        //data: JSON.stringify(payload),
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        }
        
    });

}
