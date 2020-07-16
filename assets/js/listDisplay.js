$(document).ready(function () {
    const key = 'BiHVnHmBdjWPwM1U5tq9wNOta5bntAP3VHKWNp6GmzITbQh6jQ';
    const secret = 'iUOnf7VZ0Ijeyh5eU8Trqk9iTqBpjRGSYs1JmWD7';

    const pf = new petfinder.Client({ apiKey: key, secret: secret });

    pf.animal.search()
        .then((response) => {
            console.log(response);
            let x = 0;
            let y = 0;
            let z = 0;
            let cssClass = "." + z;

            while (x < response.data.animals.length) {
                if (response.data.animals[x].primary_photo_cropped === null) { x++; continue; };
                console.log(y);
                if (y === 0) {
                    $(".output").append(`<div class="row ${z}">`);
                    y++;
                    z++;
                    cssClass = "." + (z - 1);
                } else if (y === 2) {
                    y = 0;
                } else {
                    y++;
                }
                $(cssClass).append(`<div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <img src="${response.data.animals[x].primary_photo_cropped.small}" class="card-img-top" alt="pet image">
                    <div class="card-body">
                        <h5 class="card-title">${response.data.animals[x].name}</h5>
                        <p class="card-text">${response.data.animals[x].gender}</p>
                        <p class="card-text">${response.data.animals[x].breeds.mixed}</p>
                        <p class="card-text">${response.data.animals[x].breeds.primary}</p>
                        <p class="card-text">${response.data.animals[x].colors.primary}</p>
                        <p class="card-text">${response.data.animals[x].description}</p>
                        <a data-id="${response.data.animals[x].id}" data-photo="${response.data.animals[x].primary_photo_cropped.small}" data-name="${response.data.animals[x].name}" data-profile="${response.data.animals[x].url}" class="btn btn-primary">Add to Wishlist</a>
                    </div>
                </div>
                </div>`);
                x++;
            }

        })
        .catch(function (error) {
            console.log(error);
        });

    $(document).on("click", ".btn", function() {
        console.log($(this));
        $ID = $(this).attr('data-id');
        $photo = $(this).attr('data-photo');
        $name = $(this).attr('data-name');
        $profile = $(this).attr('data-profile')
        console.log("Selected ID:" + $ID);
        console.log("Selected photo:" + $photo);
        console.log("Selected name:" + $name);
        console.log("Selected name:" + $profile);
    });
})