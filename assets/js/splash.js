$(document).ready(() =>{

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

    // $('.output').delegate('.SubmitLogin', 'click', () => {
    // });

    // $('.output').delegate('.submitSignup', 'click', () => {
    // });

    writeLogin = () => {
        console.log("button clicked")
        $('.output').empty();
        $('.output').append(`
            <div class="row justify-content-center">
                <div class="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <form  method="POST" action="/user/signin" class="login">
                    <div class="form-group">
                        <label for="name">User Name</label>
                        <input type="text" class="form-control" name="Username" placeholder="username">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" name="password" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-secondary btn-lg submitLogin">Login</button>
                    </form>
                    <br>
                    <p>Or</p>
                    <button type="button" class="btn btn-secondary btn-lg signup">Signup</button>
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
                    <form method="Post" action="/user/signup" class="signup">
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
                    <button type="submit" class="btn btn-secondary btn-lg submitSignup">Sign Up</button>
                    </form>
                    <br>
                    <p>Or</p>
                    <button type="button" class="btn btn-secondary btn-lg login">Login</button>
                </div>
            </div>
        `);
    }


});