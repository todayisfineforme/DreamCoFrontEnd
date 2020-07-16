$(document).ready(() =>{
    $.ajax({
        url: "http://localhost:3000/animals/wishlist/2", 
        method: 'GET',
        success: function(response){
            console.log(response);
            let x = 0;
            while ( x <= response.length){
                $("tbody").append(`
                <tr>
                    <td class="listImg">
                        <img src="${response[x].ImageURL}" alt="pet image" height="150">
                    </td>
                    <td class="name">
                        <p>${response[x].PetName}</p>
                    </td>
                    <td class="location">
                        <p>Chicago</p>
                    </td>
                    <td class="details">
                        <button type="button" data-id="${response[x].PetID}" data-user="${response[x].UserID}" class="btn btn-secondary btn-lg viewPet">View Details</button>
                    </td>
                    <td class="remove">
                        <button type="button" data-id="${response[x].PetID}" data-user="${response[x].UserID}" class="btn btn-secondary btn-lg removePet">Remove from list?</button>
                    </td>
                </tr>
                `);
                x++;
            }
        }
    });
});