$(document).ready(function () {

    vendorList();
});

let pageNumber = 1;
let pageSize = 10;

function vendorList(pageNumber = 1) {
    debugger
    console.log("start vendor list")
    $.ajax({
        url: '/Vendor/GetVendorList',
        type: 'GET',
        data: {
            PageNumber: pageNumber,
            PageSize: pageSize
        },


        success: function (response) {
            debugger

            console.log("Get vendor list")
            console.log("vendor list", response)
            let totalrecords = response.data[0].totalRecords
            var totalPages = Math.ceil(totalrecords / pageSize);

            let start = ((pageNumber - 1) * pageSize) + 1;
            let end = Math.min(pageNumber * pageSize, totalrecords);

            console.log(totalrecords, '--', totalPages);

            var html = "";
            response.data.forEach((data, index) => {

                html += `   {<tr>
                                <td class="vendor cell-supplier-code">
                                    <span class="vendor supplier-code-text">${data?.business_Name}</span><br />
                                    <small class="vendor hotel-name-sub">(Pvt Ltd)</small>
                                </td>
                                <td class="vendor cell-hotel-name">
                                    <strong class="hotel-name-title">${data?.services}</strong><br>
                                    @* <small class="hotel-name-sub">Luxury Hotel</small> *@
                                </td>
                                <td class="vendor cell-location">
                                    <span class="vendor location-city">${data?.stateName}</span><br>
                                    <small class="vendor location-country">${data?.cityName}</small>
                                </td>
                                <td class="vendor cell-star">
                                    <span class="vendor star-rating">${data?.phone}</span><br>
                                    <small class="vendor star-status">${data?.email}</small>
                                </td>
                                <td class="vendor cell-data">
                                    <span class="vendor data-percentage">Advance</span>
                                </td>
                                 <td class="vendor cell-status">
                                    <span class="vendor status status--active">Advance</span>
                                </td>

                            <td class="cell-action">
                                <span class="vendor action-edit"> <img src="/img/vendor-edit.svg" class="img-fluid" /></span>
                                <span class="vendor action-print"><img src="/img/vendor-view.svg" class="img-fluid" /></span>
                            </td>
                        </tr>
                            }`
            })

            $('#data').html(html);

            $('.pagination-info').text(`Showing ${start}–${end} of ${totalrecords} vendors`);


            let paginationHtml = "";

            // PREVIOUS BUTTON
            paginationHtml += `
                <button class="inventory-pagination__btn"
                    onclick="loadData(${pageNumber - 1})"
                    ${pageNumber === 1 ? 'disabled' : ''}>
                    ◀
                </button>`;

            // PAGE NUMBERS
            for (let i = 1; i <= totalPages; i++) {

                if (i === 1 || i === totalPages || Math.abs(i - pageNumber) <= 1) {

                    paginationHtml += `
                        <button class="inventory-pagination__btn
                            ${i === pageNumber ? 'inventory-pagination__btn--active' : ''}"
                            onclick="loadData(${i})">
                            ${i}
                        </button>`;
                }
                else if (i === pageNumber - 2 || i === pageNumber + 2) {
                    paginationHtml += `<span style="padding:5px;">...</span>`;
                }
            }

            // NEXT BUTTON
            paginationHtml += `
                <button class="inventory-pagination__btn"
                    onclick="loadPage(${pageNumber + 1})"
                    ${pageNumber === totalPages ? 'disabled' : ''}>
                    ▶
                </button>`;

            // APPLY TO UI
            $('.inventory-pagination__list').html(paginationHtml);

        },

        error: function (xhr, status, error) {
            console.log("Error Status:", status);
            console.log("Error Message:", error);
            console.log("Response:", xhr.responseText);

            alert("Something went wrong while fetching hotel data.");
        }
    });

}

function loadData(pageNumber = 1) {
    pageNumber = 1
    vendorList();
}
