$(document).ready(function () {
    let userid = sessionStorage.getItem('userid');
    if (userid != null) {
        const key = 'BiHVnHmBdjWPwM1U5tq9wNOta5bntAP3VHKWNp6GmzITbQh6jQ';
        const secret = 'iUOnf7VZ0Ijeyh5eU8Trqk9iTqBpjRGSYs1JmWD7';
        let pets = [];
        const pf = new petfinder.Client({ apiKey: key, secret: secret });

        function getLocation() {
            var lat = 0;
            var long = 0;
            let zip = ""
            console.log(navigator);

            function success(pos) {
                lat = pos.coords.latitude;
                long = pos.coords.longitude;
                getPets(lat, long);
                console.log("success")
            }

            function error(err) {
                lat = 41.8781;
                long = -87.6298;
                getPets(lat, long);
                console.log(err);
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            navigator.geolocation.getCurrentPosition(success, error)
        }

        function getPets(lat, long) {
            pf.animal.search({
                latitude: lat,
                longitude: long,
                limit: 20
            })
                .then(function (response) {
                    console.log(response);
                    let resNum = 0;
                    let rowContentCount = 0;
                    let rowCount = 0;
                    let cssClass = "." + rowCount;


                    while (resNum < response.data.animals.length) {
                        let mixed = "No";
                        let color = response.data.animals[resNum].colors.primary;
                        let desc = response.data.animals[resNum].description;
                        if (response.data.animals[resNum].primary_photo_cropped === null) { resNum++; continue; };

                        if (response.data.animals[resNum].breeds.mixed) {
                            mixed = "Yes";
                        }

                        if (response.data.animals[resNum].colors.primary === null) {
                            color = "Not provided"
                        }

                        if (response.data.animals[resNum].description === null) {
                            desc = "Not provided"
                        }

                        pets.push(response[resNum]);
                        console.log(rowContentCount);
                        if (rowContentCount === 0) {
                            $(".output").append(`<div class="row ${rowCount}">`);
                            rowContentCount++;
                            rowCount++;
                            cssClass = "." + (rowCount - 1);
                        } else if (rowContentCount === 2) {
                            rowContentCount = 0;
                        } else {
                            rowContentCount++;
                        }
                        $(cssClass).append(`<div class="col-md-4 petCard">
                    <div class="row cardRow">
                    <div class="card">
                        <img id="petImg"src="${response.data.animals[resNum].primary_photo_cropped.small}" class="card-img-top petImg" alt="pet image">
                        <div class="card-body" id="petResult">
                            <h5 class="card-title" id="name">${response.data.animals[resNum].name}</h5>
                            <p id="id" style="display:none;">${response.data.animals[resNum].id}</p>
                            <p class="card-text">Gender: ${response.data.animals[resNum].gender}</p>
                            <p class="card-text">Mixed: ${mixed}</p>
                            <p class="card-text">Primary Breed: ${response.data.animals[resNum].breeds.primary}</p>
                            <p class="card-text">Color: ${color}</p>
                            <p class="card-text">Description: ${desc}</p>
                        </div>
                    </div>
                    </div>
                        <div class="row wishBtnDiv"><button data-id="${response.data.animals[resNum].id}" data-photo="${response.data.animals[resNum].primary_photo_cropped.small}" data-name="${response.data.animals[resNum].name}" data-profile="${response.data.animals[resNum].url}" href="#" class="btn btn-secondary wishBtn">Add to Wishlist</button></div>
                    </div>`);
                        resNum++;
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        $(document).on("click", ".btn", function () {
            console.log($(this));
            $ID = $(this).attr('data-id');
            $photo = $(this).attr('data-photo');
            $name = $(this).attr('data-name');
            $profile = $(this).attr('data-profile')
            console.log("Selected ID:" + $ID);
            console.log("Selected photo:" + $photo);
            console.log("Selected name:" + $name);
            console.log("Selected profile:" + $profile);

            const queryURL = "https://enigmatic-reaches-67118.herokuapp.com/animals/add";

            $.ajax({
                url: queryURL,
                method: "POST",
                crossDomain: true,
                data: {
                    petName: $name,
                    note: "",
                    photoUrl: $photo,
                    profileUrl: $profile,
                    petId: $ID,
                    userid: sessionStorage.getItem('userid')
                }
            }).then(function (response) {
                console.log(response);
            });
            return false;
        });

        getLocation();
    }else{
        window.location = '../../index.html';
    }
});