$(document).ready(function(){
    const key = 'BiHVnHmBdjWPwM1U5tq9wNOta5bntAP3VHKWNp6GmzITbQh6jQ';
    const secret = 'iUOnf7VZ0Ijeyh5eU8Trqk9iTqBpjRGSYs1JmWD7';
    
    var pf = new petfinder.Client({apiKey: key, secret: secret});

    pf.animal.search()
        .then(function (response) {
            console.log(response);
            let x = 0;
            let y = 0;
            let z = 0;
            let cssClass = "." + z;

            while(x < response.data.animals.length){
                if (response.data.animals[x].primary_photo_cropped === null) { x++; continue; };
                console.log(y);
                if(y === 0){
                    $(".output").append(`<div class="row ${z}">`);
                    y++;
                    z++;
                    cssClass = "." + (z-1);
                } else if(y === 2){
                    y = 0;
                } else{
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
                        <a href="#" class="btn btn-primary">Add to Wishlist</a>
                    </div>
                </div>
                </div>`);
                x++;
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    
    })