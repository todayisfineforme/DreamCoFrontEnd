$(document).ready(() => {

    $('.login').on('click', () => {
        writeLogin();
    });

    $('.signup').on('click', () => {
        writeSignUp();
    });

    $('.output').delegate('.login', 'click', () => {
        writeLogin();
    });

    $('.output').delegate('.signup', 'click', () => {
        writeSignUp();
    });

    $('.output').delegate('.submitLogin', 'click', () => {

        let userName = $('input[name="userName"]').val();
        let password = $('input[name="password"]').val();

        $.ajax({
            method: "POST",
            url: "https://enigmatic-reaches-67118.herokuapp.com/user/signin",
            data: {
                userName: `${userName}`,
                password: `${password}`
            }
        }).done((response) => {
            if (response.success) {
                console.log(response.success);
                sessionStorage.setItem('userid', response.userid);
                window.location ='./assets/html/listDisplay.html';
            }
            else
                console.log(response.error);
        });
    });

    $('.output').delegate('.submitSignup', 'click', () => {

        let userName = $('input[name="userName"]').val();
        let password = $('input[name="password"]').val();
        let email = $('input[name="email"]').val();

        $.ajax({
            method: "POST",
            url: "https://enigmatic-reaches-67118.herokuapp.com/user/signup",
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
    });

    writeLogin = () => {
        console.log("button clicked")
        $('.output').empty();
        $('.output').append(`
            <div class="row justify-content-center">
                <div class="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <form class="loginform">
                    <div class="form-group">
                        <label for="name">User Name</label>
                        <input type="text" class="form-control" name="userName" placeholder="username">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" name="password" placeholder="Password">
                    </div>
                    <button type="button" class="btn btn-secondary btn-lg submitLogin">Login</button>
                    </form>
                    <br>
                    <p>Or</p>
                    <button type="button" class="btn btn-secondary btn-lg submitSignin">Signup</button>
                </div>
            </div>
        `);
    }

    writeSignUp = () => {
        console.log("button clicked")
        $('.output').empty();
        $('.output').append(`
            <div class="row justify-content-center">
                <div class="col-md-6 col-md-offset-3">
                    <h2>Sign Up Form</h2>
                    <form class="signupform">
                        <div class="form-group">
                            <label for="name">User Name</label>
                            <input type="text" class="form-control" name="userName" placeholder="userName">
                        </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="text" class="form-control" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" name="password" placeholder="Password">
                    </div>
                    <div style="display: none" id="alert" class="alert alert-danger" role="alert">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span> <span class="msg"></span>
                    </div>
                    <button type="button" class="btn btn-secondary btn-lg submitSignup">Sign Up</button>
                    </form>
                    <br>
                    <p>Or</p>
                    <button type="button" class="btn btn-secondary btn-lg login">Login</button>
                </div>
            </div>
        `);
    }
});