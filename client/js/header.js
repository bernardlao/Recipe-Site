Template.header.helpers({
    'category': function () {
        return Category.find({}, { sort: { name: -1 } });
    }
});


Template.header.events({

    'click #forlogout': function (e) {
        e.preventDefault();
        $('#login').removeClass('onshows').addClass('onhides');
         $('#forAdminlog').removeClass('onshows').addClass('onhides');
        $('#notlogin').removeClass('onhides').addClass('onshows');
         $('#forAdmin').removeClass('onshows').addClass('hiddens');
        $('#user_img').attr({ 'src':'images/user1.png'})
        Router.go('Home');
    },

    'click #login_user':function(e)
    {
        e.preventDefault();
        alert(e.target.value);
    }
});


