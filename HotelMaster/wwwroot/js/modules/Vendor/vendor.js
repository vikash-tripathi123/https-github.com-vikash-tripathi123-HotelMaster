
$(document).ready(function () {
  // stateList();
    //cityList();
    loadVendors();
});


let currentPage = 1;
const pageSize = 10;

document.querySelectorAll('input[name="service"]').forEach(el => {
    el.addEventListener("click", function () {
        debugger;
        let selectedServices = Array.from(
            document.querySelectorAll('input[name="service"]:checked')
        ).map(x => x.value);

        console.log(selectedServices);

        // Call your function if needed
        loadVendors();
    });
});
``


/* =========================
   LOAD VENDOR LIST
========================= */
function loadVendors() {

    debugger;

    // Service IDs
    let serviceIds = [...document.querySelectorAll('input[name="service"]:checked')]
        .map(x => x.value);

    // Payment Types
    let paymentTypes = [...document.querySelectorAll('input[name="payment"]:checked')]
        .map(x => x.value);

    // Dropdowns
    let StateId = document.querySelector("#stateSelect")?.value || 0;

    let CityId = document.querySelector("#citySelect")?.value || 0;

    let filters = {

        ServiceCategory: serviceIds,

        PaymentType: paymentTypes,

        StateId: StateId,

        CityId: CityId,

        PageNumber: currentPage,

        PageSize: pageSize
    };

    $.ajax({

        url: '/Vendor/GetVendorList',

        type: 'GET',

        traditional: true,

        data: filters,

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

            renderPagination(
                response.data[0].totalRecords,
                currentPage
            );
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

$(document).on('click', '.inventory-pagination__btn', function () {

    const page = $(this).data('page');

    if (page) {
        loadVendors(page);
    }
});

// when city change
document.querySelector("#stateSelect").addEventListener("change", cityList);
document.querySelector("#stateSelect").addEventListener("change", loadVendors);
document.querySelector("#citySelect").addEventListener("change", loadVendors);
function cityList() {
    debugger
    var selectedValue = $('#stateSelect').val();

    console.log(selectedValue)
    if (selectedValue > 0) {

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
    else {

     
        $("#citySelect").empty();

        // ✅ Default option
        $("#citySelect").html('<option value="">-- Select City --</option>');
    }
}


/* =========================
   PAGINATION CLICK
========================= */


//clear filters
document.querySelector("#clearFilter").addEventListener("click", clearFilters); 
function clearFilters() {

    // ✅ Uncheck all service checkboxes
    document.querySelectorAll('input[name="service"]').forEach(x => x.checked = false);

    // ✅ Uncheck all payment checkboxes
    document.querySelectorAll('input[name="payment"]').forEach(x => x.checked = false);

    // ✅ Reset dropdowns
    let stateEl = document.querySelector("#stateSelect");
    if (stateEl) stateEl.value = 0;

    let cityEl = document.querySelector("#citySelect");
    if (cityEl) cityEl.value = 0;

    // ✅ Reset pagination
    let pageNumber = 1;
    let pageSize = 10;

    // ✅ Reload data
    loadVendors();
}
