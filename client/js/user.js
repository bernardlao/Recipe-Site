$('[data-toggle=offcanvas]').click(function () {
    $('.row-offcanvas').toggleClass('active');
    $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
});

var userid = $('#user_id').val();
Template.user.helpers({
    'category_name': function () {
        Category.find({}, { sort: { name: -1 } });
        return Category.find({}, { sort: { name: -1 } });
    },
    'user': function () {
        var id = $('#login_user').val();
        //  alert('gumana')
        User.find({ _id: id }).forEach(

            function (ee) {
                //  alert(ee.firstname)
                $('#txtFname').val(ee.firstname);
                $('#txtFname').attr({ 'value': ee.firstname });
                $('#txtFname').append(ee.firstname);
            }
        ), this
        return User.find({ _id: id });
    },
    'recipes': function () {
          var id = $('#login_user').val();
        return Recipes.find({ user_id:id });
    }
});

Template.user.events({
    'click #btnUpdateUser': function (e) {
        e.preventDefault();
        var fname = $('#e_fName').val();
        var lname = $('#e_lName').val();
        var addrs = $('#e_addr').val();
        var egender = $('#e_gender').val();
        var eage = $('#e_age').val();
        var epass = $('#e_pword').val();

        var id = $('#login_user').val();
        // alert(id);
        User.update({ _id: id }, { $set: { firstname: fname, lastname: lname, address: addrs, gender: egender, age: eage, password: epass } });

        alert("Update Success");
        $('#e_fName').prop('disabled', true);
        $('#e_lName').prop('disabled', true);
        $('#e_addr').prop('disabled', true);
        $('#e_gender').prop('disabled', true);
        $('#e_age').prop('disabled', true);
        $('#e_pword').prop('disabled', true);
        $('#btnUpdateUser').prop('disabled', true);
        $('#btnEdit').removeAttr('disabled');
        User.find({ _id: id });
    },
    'click #btnEdit': function (e) {
        e.preventDefault();
        $('#e_fName').removeAttr('disabled');
        $('#e_lName').removeAttr('disabled');
        $('#e_addr').removeAttr('disabled');
        $('#e_gender').removeAttr('disabled');
        $('#e_age').removeAttr('disabled');
        $('#e_pword').removeAttr('disabled');
        $('#btnUpdateUser').removeAttr('disabled');
        $('#btnEdit').attr('disabled', true);
    },
    'click #btnSavePhoto': function () {
        
        var login_id = $('#login_user').val();
        //var photoTemps = _.template($('#myphoto').html());
        var photoHolder = $('#myphoto')[0];
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            _.each(photoHolder.files, function (file) {
                if (file.size > 1) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        // PhotosRecipe.insert({
                        //     name: file.name,
                        //     type: file.type,
                        //     dataUrl: reader.result,
                        //     idrecipe: login_id
                        // });
                        User.update({ _id: login_id }, { $set: { photo: reader.result } });
                    }
                    reader.readAsDataURL(file);
                    alert('successfully update')
                }
            });
            $('#profile').val('');
            alert('Success')
        }
    }

});
$(document).ready(function(){
    
});

