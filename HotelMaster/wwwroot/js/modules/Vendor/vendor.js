//$(function () {
//    stateList();
//    loadVendors();
//});

$(document).ready(function () {
   stateList();
    //cityList();
    loadVendors();
});


let currentPage = 1;
const pageSize = 10;

/* =========================
   LOAD VENDOR LIST
========================= */
function loadVendors() {

    let filters = {
        PageNumber: currentPage,
        PageSize: pageSize
    }

    $.ajax({
        url: '/Vendor/GetVendorList',
        type: 'GET',
        data: filters,

        //beforeSend: function () {
        //    console.log("Loading...");
        //},

        success: function (response) {

            if (!response || !response.data || response.data.length === 0) {
                $('#data').html(`
                    <tr>
                        <td colspan="7" class="text-center">
                            No Data Found
                        </td>
                    </tr>
                `);

                $('.inventory-pagination__list').html('');
                $('.pagination-info').text('');
                return;
            }

            renderTable(response.data);
            renderPagination(response.data[0].totalRecords, currentPage);
        },

        error: function (xhr) {

            console.log(xhr.responseText);

            $('#data').html(`
                <tr>
                    <td colspan="7" class="text-center text-danger">
                        Failed to load vendors
                    </td>
                </tr>
            `);
        }
    });
}

/* =========================
   TABLE RENDER
========================= */
function renderTable(vendors) {

    let html = vendors.map(vendor => `
        <tr>

            <td class="vendor cell-supplier-code">
                <span class="vendor supplier-code-text">
                    ${vendor.business_Name ?? ''}
                </span>
                <br />
                <small class="vendor hotel-name-sub">(Pvt Ltd)</small>
            </td>

            <td class="vendor cell-hotel-name">
                <strong class="hotel-name-title">
                    ${vendor.services ?? ''}
                </strong>
            </td>

            <td class="vendor cell-location">
                <span class="vendor location-city">
                    ${vendor.stateName ?? ''}
                </span>
                <br>
                <small class="vendor location-country">
                    ${vendor.cityName ?? ''}
                </small>
            </td>

            <td class="vendor cell-star">
                <span class="vendor star-rating">
                    ${vendor.phone ?? ''}
                </span>
                <br>
                <small class="vendor star-status">
                    ${vendor.email ?? ''}
                </small>
            </td>

            <td class="vendor cell-data">
                <span class="vendor data-percentage">
                    Advance
                </span>
            </td>

            <td class="vendor cell-status">
                <span class="vendor status status--active">
                    Active
                </span>
            </td>

            <td class="cell-action">
                <span class="vendor action-edit">
                    <img src="/img/vendor-edit.svg" class="img-fluid" />
                </span>

                <span class="vendor action-print">
                    <img src="/img/vendor-view.svg" class="img-fluid" />
                </span>
            </td>

        </tr>
    `).join('');

    $('#data').html(html);
}

/* =========================
   PAGINATION
========================= */
function renderPagination(totalRecords, page) {

    const totalPages = Math.ceil(totalRecords / pageSize);

    const start = ((page - 1) * pageSize) + 1;
    const end = Math.min(page * pageSize, totalRecords);

    $('.pagination-info')
        .text(`Showing ${start} - ${end} of ${totalRecords} vendors`);

    let html = '';

    // PREVIOUS
    html += `
        <button class="inventory-pagination__btn"
            ${page === 1 ? 'disabled' : ''}
            data-page="${page - 1}">
            ◀
        </button>
    `;

    // PAGE NUMBERS
    for (let i = 1; i <= totalPages; i++) {

        html += `
            <button class="inventory-pagination__btn
                ${page === i ? 'inventory-pagination__btn--active' : ''}"
                data-page="${i}">
                ${i}
            </button>
        `;
    }

    // NEXT
    html += `
        <button class="inventory-pagination__btn"
            ${page === totalPages ? 'disabled' : ''}
            data-page="${page + 1}">
            ▶
        </button>
    `;

    $('.inventory-pagination__list').html(html);
}


// State List API
function stateList() {
    $.ajax({
        url: '/Vendor/StateList',
        type: 'GET',


        success: function (response) {
            console.log("State Response:", response);

            // ✅ Clear dropdown
            $("#stateSelect").empty();

            // ✅ Default option
            $("#stateSelect").append('<option value="">-- Select State --</option>');

            // ✅ Check no data
            if (!response || response.length === 0) {
                $("#stateSelect").append('<option>No data available</option>');
                return;
            }

            // ✅ Bind data
            response.data.forEach((item, data) => {

                $("#stateSelect").append(
                    `<option value="${item.stateId}">${item.stateName}</option>`
                );
            });

              
           
        },


        error: function (xhr) {
            debugger
            // ✅ Clear dropdown
            $("#stateSelect").empty();

            // ✅ Default option
            $("#stateSelect").append('<option value="">-- Select State --</option>');
            console.log("State Error:", xhr.responseText);
        }
    });
}

//  City List API

// CORRECT: Passes the function reference
document.querySelector("#stateSelect").addEventListener("change", cityList);


function cityList() {
    debugger
    var selectedValue = $('#stateSelect').val();

    console.log(selectedValue)
    $.ajax({
        url: '/Masters/CityList',
        type: 'GET',
        data: {
            stateId: selectedValue
        },
        success: function (response) {
            debugger
            console.log("City Response:", response);

            // ✅ Clear dropdown
            $("#citySelect").empty();

            // ✅ Default option
            $("#citySelect").append('<option value="">-- Select City --</option>');

            // ✅ Check no data
            if (!response || response.length === 0) {
                $("#citySelect").append('<option>No data available</option>');
                return;
            }

            // ✅ Bind data
            response.data.forEach((item, index) => {

                $("#citySelect").append(
                    `<option value="${item.cityId}">${item.cityName}</option>`
                );
            });
        },

        error: function (xhr) {
            debugger
            console.log("City Error:", xhr.responseText);
            $("#citySelect").empty();

            // ✅ Default option
            $("#citySelect").append('<option value="">-- Select City --</option>');

        }
    });
}


/* =========================
   PAGINATION CLICK
========================= */
$(document).on('click', '.inventory-pagination__btn', function () {

    const page = $(this).data('page');

    if (page) {
        loadVendors(page);
    }
});