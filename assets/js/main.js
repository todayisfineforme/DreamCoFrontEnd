function signup() {
    let userName = $('input[name="userName"]').val();
    let password = $('input[name="password"]').val();
    let email = $('input[name="email"]').val();

    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:3000/user/signup","https://enigmatic-reaches-67118.herokuapp.com/user/signup",
        data: {
            userName: `${userName}`,
            email: `${email}`,
            password: `${password}`
        }
    }).done((response) => {
        if (response.success)
            writeLogin();
        else
            console.log(response.error);
    });
};

function signin() {
    let userName = $('input[name="userName"]').val();
    let password = $('input[name="password"]').val();

    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:3000/user/signin","https://enigmatic-reaches-67118.herokuapp.com/user/signin",
        data: {
            userName: `${userName}`,
            password: `${password}`
        }
    }).done((response) => {
        if (response.success)
          console.log(response.success); 
          //go to next page
        else
            console.log(response.error);
    });
};