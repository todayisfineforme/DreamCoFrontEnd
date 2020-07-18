$(document).ready(() => {
    let userid = sessionStorage.getItem('userid');
    if (userid != null) {
        $.ajax({
            url: `https://enigmatic-reaches-67118.herokuapp.com/animals/wishlist/${userid}`,
            method: 'GET',
            success: function (response) {
                console.log(response);
                let rowLength = 0;
                while (rowLength < response.length) {
                    $("tbody").append(`
                <tr>
                    <td class="listImg">
                        <img src="${response[rowLength].photoUrl}" alt="pet image" height="150">
                    </td>
                    <td class="name">
                        <p>${response[rowLength].petname}</p>
                    </td>
                    <td class="notes">
                        <textarea name="notes" id="petnotes" cols="15" rows="4" maxlength="250">${response[rowLength].note}</textarea>
                        <button data-id="${response[rowLength].id}" class="btn btn-secondary btn-sm updatenote">Update</button>
                    </td>
                    <td class="details">
                        <button type="button" data-url="${response[rowLength].profileUrl}" class="btn btn-secondary btn-lg viewPet">View Details</button>
                    </td>
                    <td class="remove">
                        <button type="button" data-id="${response[rowLength].id}" class="btn btn-secondary btn-lg removePet">Remove from list?</button>
                    </td>
                </tr>
                `);
                    rowLength++;
                }

                listenToEvents();
            }
        });
    } else {
        window.location = '../../index.html';
    }
});

function listenToEvents() {
    $('.updatenote').on('click', updateWishlistNote);
    $('.removePet').on('click', deleteWishListItem);
}

function updateWishlistNote() {
    let wishlistId = $(this).attr('data-id');
    let note = $(this).prev().val();
    const queryURL = "https://enigmatic-reaches-67118.herokuapp.com/animals/wishlist/note";

    $.ajax({
        url: queryURL,
        method: "PATCH",
        data: {
            wishlistId: wishlistId,
            note: note
        }
    }).then(function (response) {
        console.log(response);
    });
}

function deleteWishListItem() {
    let wishlistId = $(this).attr('data-id');
    const queryURL = "https://enigmatic-reaches-67118.herokuapp.com/animals/wishlist/delete";
    let wishlistItemRow = $(this).parents("tr").first();
    $.ajax({
        url: queryURL,
        method: "DELETE",
        data: {
            wishlistId: wishlistId
        }
    }).then(function (response) {
        if (response.success) {
            wishlistItemRow.remove();
        }
        console.log(response);
    });
}

$(document).on("click", ".viewPet", function () {
    console.log($(this));
    $profile = $(this).attr('data-url');
    console.log($profile);
    window.open(`${$profile}`, '_blank');
});