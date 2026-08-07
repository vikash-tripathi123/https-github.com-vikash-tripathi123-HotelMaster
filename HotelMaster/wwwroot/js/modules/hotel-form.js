document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("hotelForm");

    // ================= FIELDS =================
    const Name = document.getElementById("Name");
    const PropertyType = document.getElementById("PropertyType");
    const StarRating = document.getElementById("StarRating");
    const ChainType = document.getElementById("ChainType");
    const OwnerName = document.getElementById("OwnerName");
    const OwnerPhone = document.getElementById("OwnerPhone");
    const City = document.getElementById("City");
    const State = document.getElementById("State");
    const PinCode = document.getElementById("PinCode");
    const Country = document.getElementById("Country");
    const NoOfRooms = document.getElementById("NoOfRooms");
    const NoOfFloors = document.getElementById("NoOfFloors");

    // ================= ERROR FUNCTIONS =================
    function showError(input, message) {
        let error = input.parentNode.querySelector(".error-text");

        if (!error) {
            error = document.createElement("span");
            error.className = "error-text";
            input.parentNode.appendChild(error);
        }

        error.innerText = message;
        input.classList.add("input-error");
    }

    function clearError(input) {
        const error = input.parentNode.querySelector(".error-text");
        if (error) error.remove();
        input.classList.remove("input-error");
    }

    // ================= VALIDATION =================
    function validateForm() {

        let isValid = z;

        if (Name.value.trim() === "") {
            showError(Name, "Enter hotel name");
            isValid = false;
        } else clearError(Name);

        if (PropertyType.value === "") {
            showError(PropertyType, "Select property type");
            isValid = false;
        } else clearError(PropertyType);

        if (StarRating.value === "") {
            showError(StarRating, "Select star rating");
            isValid = false;
        } else clearError(StarRating);

        if (ChainType.value === "") {
            showError(ChainType, "Select chain type");
            isValid = false;
        } else clearError(ChainType);

        if (OwnerName.value.trim() === "") {
            showError(OwnerName, "Enter owner name");
            isValid = false;
        } else clearError(OwnerName);

        if (!/^[0-9]{10}$/.test(OwnerPhone.value)) {
            showError(OwnerPhone, "Enter valid 10 digit number");
            isValid = false;
        } else clearError(OwnerPhone);

        if (City.value.trim() === "") {
            showError(City, "Enter city");
            isValid = false;
        } else clearError(City);

        if (State.value === "") {
            showError(State, "Select state");
            isValid = false;
        } else clearError(State);

        if (!/^[0-9]{6}$/.test(PinCode.value)) {
            showError(PinCode, "Enter valid pincode");
            isValid = false;
        } else clearError(PinCode);

        if (Country.value === "") {
            showError(Country, "Select country");
            isValid = false;
        } else clearError(Country);

        if (!/^[0-9]+$/.test(NoOfRooms.value)) {
            showError(NoOfRooms, "Only numbers allowed");
            isValid = false;
        } else clearError(NoOfRooms);

        if (!/^[0-9]+$/.test(NoOfFloors.value)) {
            showError(NoOfFloors, "Only numbers allowed");
            isValid = false;
        } else clearError(NoOfFloors);

        return isValid;
    }

    // ================= SUBMIT EVENT =================
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        if (validateForm()) {

            // ================= STEP 2: MODEL CREATE =================
            const hotelModel = {
                Name: Name.value.trim(),
                PropertyType: PropertyType.value,
                StarRating: StarRating.value,
                ChainType: ChainType.value,
                OwnerName: OwnerName.value.trim(),
                OwnerPhone: OwnerPhone.value.trim(),
                City: City.value.trim(),
                State: State.value,
                PinCode: PinCode.value.trim(),
                Country: Country.value,
                NoOfRooms: NoOfRooms.value.trim(),
                NoOfFloors: NoOfFloors.value.trim()
            };

            console.log("Hotel Model Created ✅", hotelModel);

            alert("Form is valid + Model created ✅");

            // ================= STEP 3 (OPTIONAL): SEND TO BACKEND =================
            /*
            fetch("/Hotel/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(hotelModel)
            })
            .then(res => res.json())
            .then(data => {
                alert("Saved successfully ✅");
                form.reset();
            })
            .catch(err => {
                console.log(err);
            });
            */
        }
    });

});
