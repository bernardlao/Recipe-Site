Template.view_only.helpers({

    'category_name': function () {
        return Category.find({}, { sort: { name: -1 } });
    },
    'temp_ingredients': function () {
        return temp_Ingredients.find({}, { sort: { ingredients_name: -1 } });
    },
    'temp_procedure': function () {
        return temp_Procedure.find({}, { sort: { procedure_details: -1 } });
    },
    'category_name': function () {
        return Category.find({}, { sort: { name: -1 } })
    },
    'Ingredients': function () {
        // var u_id = $('#login_user').val();
        return Ingredients.find({ recipe_id: this._id });
    },
    'recipe_my': function () {
        var id_r = this._id;//this._id;
        return Recipes.find({ _id: id_r });
    },
    'ingredient_my': function () {
        var id_r = this._id;
        var ingCol = Ingredients.find({ recipe_id: id_r });
        ingCol.forEach(function (e) {
            temp_Ingredients.insert({
                ingredients_name: e.ingredients_name
            });
        });
        return temp_Ingredients.find({});
    },
    'procedure_my': function () {
        var id_r = this._id;
        var proCol = Procedure.find({ recipe_id: id_r });
        proCol.forEach(function (e) {
            temp_Procedure.insert({
                procedure_details: e.procedure_details
            });
        });
        return temp_Procedure.find({});
    },
    'commenter':function(){
        var userID = this.userid;
        return User.find({_id:userID});
    },
    'comments':function(){
        var selectedID = this._id;
        return Comments.find({recipe_id:selectedID},{$sort:{comment_date:-1}});
    }
});
Template.view_only.events({
    'click #comment': function (e) {
        e.preventDefault();
        var userID = $('#login_user').val();
        var selectedID = $('#selectedID').val();
        if (userID.toString() == "wala pa") {
            alert("You need to login to post any comment.");
            return;
        }
        var commented = $('#comment_area').val();
        if(commented.trim().toString().length == 0){
            alert("There is no comment to post.");
        }else{
            Comments.insert({
                userid:userID,
                recipe_id:selectedID,
                comment:commented,
                comment_date: new Date()
            });
            $('#comment_area').val('');
        }
    }
});
Template.view_only.created = function () {
    clearTemps();
    // var userID = $('#login_user').val();
    // if (userID.toString() == "wala pa") {
    //     $('#comment').css("visibility","hidden");
    //     alert(userID);
    // }
}
function clearTemps() {
    temp_Ingredients.find({}).forEach(
        function (ee) {
            temp_Ingredients.remove({ _id: ee._id });
        }
    );
    temp_Procedure.find({}).forEach(
        function (e) {
            temp_Procedure.remove({ _id: e._id });
        }
    );
}