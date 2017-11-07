Template.login.helpers({
    'user_info': function () {
        return User.find({}, { sort: { name: -1 } });
    }
});

Template.login.events({
    'click #btnlogin': function (event) {
        event.preventDefault();

        var uname = $('#email').val();
        var pword = $('#pword').val();
        var photo = $('#user_img').val();

        var user_collection = User.find({ e_mail: uname }, { password: pword }).count();


        if (uname.trim().toString().length != 0 && pword.trim().toString().length != 0) {
            if (User.find({ e_mail: uname }).count() != 0) {
                var s = User.find({ e_mail: uname }, { password: pword });
                if (s.count() != 0) {
                    s.forEach(
                        function (ee) {
                            alert("User successfully login!");
                            $('#login').removeClass('onhides').addClass('onshows');
                            $('#forAdminlog').removeClass('onhides').addClass('onshows')
                            $('#notlogin').removeClass('onshows').addClass('onhides');
                            $('#user_img').attr({ 'src': ee.photo });
                            $('#login_user').append(ee._id).attr({'value':ee._id});
                            Router.current().params._id;
                            Router.go('Profile');
                        }, this
                    );
                    // $("#hotelIdSelect").prop('disabled', false);

                    //  $('.onhides').css({'visibility':'visible','display':'block'});
                }
                else {
                    alert("User doesn't exist");
                }

            } else if (uname == "admin@yahoo.com" && pword == "admin") {
                $('#notlogin').removeClass('onshows').addClass('onhides');
                $('#forAdminlog').removeClass('onhides').addClass('onshow');
                $('#forAdmin').removeClass('hiddens').addClass('onshow');
                alert('Admin');
                Router.go('AddCategory');

            }
            else {
                alert("User doesn't exist");
            }

        } else {

            alert("Please fill the whole form");
        }

    }
});