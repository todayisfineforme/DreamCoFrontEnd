$(document).ready(() =>{
    $.ajax({
        url: "http://localhost:3000/animals/wishlist/2", 
        method: 'GET',
        success: function(response){
            console.log(response);
            let rowLength = 0;
            while ( rowLength < response.length){
                $("tbody").append(`
                <tr>
                    <td class="listImg">
                        <img src="${response[rowLength].ImageURL}" alt="pet image" height="150">
                    </td>
                    <td class="name">
                        <p>${response[rowLength].PetName}</p>
                    </td>
                    <td class="notes">
                        <textarea name="notes" id="petnotes" cols="15" rows="4" maxlength="250">${response[rowLength].petNotes}</textarea>
                        <button class="btn btn-secondary btn-sm updatenote">Update</button>
                    </td>
                    <td class="details">
                        <button type="button" data-url="${response[rowLength].petProfile}" class="btn btn-secondary btn-lg viewPet">View Details</button>
                    </td>
                    <td class="remove">
                        <button type="button" data-id="${response[rowLength].PetID}" data-user="${response[rowLength].UserID}" class="btn btn-secondary btn-lg removePet">Remove from list?</button>
                    </td>
                </tr>
                `);
                rowLength++;
            }
        }
    });
});