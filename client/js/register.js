
Template.register.events({
    'click #btnSignUp': function (event) {

        var fname = $('#fName').val();
        var lname = $('#lName').val();
        var addr = $('#address').val();
        var s_gender = $('#cmbgender').val();
        var s_age = $('#txtAge').val();
        var email = $('#txtEmail').val();
        var pword = $('#txtPassword').val();

        var emailCollection = User.find({ e_mail: email }).count();

        if (fname.trim().toString().length != 0 && lname.trim().toString().length != 0 &&
            addr.trim().toString().length != 0 && s_gender.trim().toString().length != 0 &&
            s_age.trim().toString().length != 0 && email.trim().toString().length != 0 && pword.trim().toString().length != 0) {
       
            if (emailCollection == 0) {
                User.insert({
                    firstname: fname,
                    lastname: lname,
                    address: addr,
                    gender: s_gender,
                    age: s_age,
                    e_mail: email,
                    password: pword,
                    photo: 'images/unknown.png'
                });
                alert("Success!!");
                Router.go('Login')
                clearTextBox();
            }
            else { alert("Invalid email  , Email already exist!"); }
        } else {
            alert("Please fill up the whole form!");
        }
    }
});
function clearTextBox() {

    $('#fName').val("");
    $('#lName').val("");
    $('#address').val("");
    $('#txtAge').val("");
    $('#txtEmail').val("");
    $('#txtPassword').val("");
}