
Template.view_per_recipe.helpers({
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
    }
});

Template.view_per_recipe.created = function () {
    clearTemps();
}

Template.view_per_recipe.events({
    //do onchang of picture here. already found at the net
    'change #imgchoose': function (e) {
        e.preventDefault();
        var rPhoto = $('#imgchoose')[0];
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            _.each(rPhoto.files, function (file) {
                if (file.size > 1) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#img-upload').attr('src', reader.result);
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    },
    'click #btnEditRecipe': function (e) {
        e.preventDefault();
        $('#recipe_edit').removeAttr('disabled');
        $('#desc_edit').removeAttr('disabled');
        $('#e_ingedients').removeAttr('disabled');
        $('#e_procedure').removeAttr('disabled');
        $('#btnUpdateRecipe').removeAttr('disabled');
        $('#imgchoose').removeAttr('disabled');
        $('#btnEditRecipe').prop('disabled', true);
        $('#btnDeleteRecipe').prop('disabled', true);
        $('#frmAddProcedure').removeClass('disabled_ol');
        $('#frmIngredients').removeClass('disabled_ol');
    },
    'click #btnUpdateRecipe': function (e) {
        e.preventDefault();
        $('#recipe_edit').prop('disabled', true);
        $('#desc_edit').prop('disabled', true);
        $('#e_ingedients').prop('disabled', true);
        $('#e_procedure').prop('disabled', true);
        $('#btnUpdateRecipe').prop('disabled', true);
        $('#imgchoose').prop('disabled', true);
        $('#btnEditRecipe').removeAttr('disabled');
        $('#btnDeleteRecipe').removeAttr('disabled');
        $('#frmAddProcedure').addClass('disabled_ol');
        $('#frmIngredients').addClass('disabled_ol');
        var recipename = $('#recipe_edit').val();
        var s_Category = $('#recipe_category').val();
        var desc = $('#desc_edit').val();
        var id = this._id;

        var ingCount = temp_Ingredients.find({}).count();
        var proCount = temp_Procedure.find({}).count();

        var isValid = true;
        if (ingCount == 0 || proCount == 0) {
            alert("Please provide Ingredients and Procedures");
            isValid = false;
        } else {
            if (recipename.trim().toString().length == 0 || desc.trim().toString().length == 0) {
                alert("Please provide the Recipe name and Description");
            }
        }
        if (isValid) {
            updateRecipe();
        }
    },
    'click #btnDeleteRecipe': function (e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this recipe'?")) {
            var rID = $('#selectedID').val();
            clearTemps();
            Ingredients.find({ recipe_id: rID }).forEach(function (e) {
                Ingredients.remove({ _id: e._id });
            });
            Procedure.find({ recipe_id: rID }).forEach(function (e) {
                Procedure.remove({ _id: e._id });
            });
            Recipes.remove({ _id: rID });
            alert("Delete Success!");
            Router.go('Profile');
        }
    },
    'keyup [name=ingredients_name]': function (e) {
        e.preventDefault();
        if (e.which == 13) {
            if ($(e.target).prop("id") == "ingredients") {
                var input = $('[name="ingredients_name"]').val();
                var ins = this;
                if (temp_Ingredients.find({ ingredients_name: input }).count() == 0) {
                    temp_Ingredients.insert({
                        ingredients_name: input
                    });
                    $('[name="ingredients_name"]').val("");
                } else {
                    alert('Ingredients name already exist')
                    $('[name="ingredients_name"]').val("");
                }
            }
        }
    },
    'keyup [name=procedure_name]': function (e) {
        e.preventDefault();
        if (e.which == 13) {
            if ($(e.target).prop("id") == "procedure") {
                var input = $('[name="procedure_name"]').val();
                var ins = this;
                if (temp_Procedure.find({ procedure_details: input }).count() == 0) {
                    temp_Procedure.insert({
                        procedure_details: input
                    });
                    $('[name="procedure_name"]').val("");
                } else {
                    alert('Procedure details already exist')
                    $('[name="ingredients_name"]').val("");
                }
            }
        }
    },

    'click [id=btndelete]': function (e) {
        e.preventDefault();
        var id = this._id;
        if (confirm("Are you sure you want to delete this ingredients ? '" + this.ingredients_name + "'?")) {
            temp_Ingredients.remove({ _id: id });
        }
    },
    'click [id=btndelete_proce]': function (e) {
        e.preventDefault();
        var id = this._id;
        if (confirm("Are you sure you want to delete this procedure ? '" + procedure_details + "'?")) {
            temp_Procedure.remove({ _id: id });
        }
    },

    'keyup [name=temp_ingredients]': function (e) {
        e.preventDefault();
        if (e.which == 13 || e.which == 27) {
            $(e.target).blur();
        }
        else {
            var id = this._id;
            var item = $(e.target).val();
            temp_Ingredients.update({ _id: id }, { $set: { ingredients_name: item } });
        }
    },
    'keyup [name=proce_name]': function (e) {
        e.preventDefault();
        if (e.which == 13 || e.which == 27) {
            $(e.target).blur();
        }
        else {
            var id = this._id;
            var item = $(e.target).val();
            temp_Procedure.update({ _id: id }, { $set: { procedure_details: item } });
        }
    },
    'keyup [id=txt_recipe]': function (e) {
        e.preventDefault();
        if (e.which == 13 || e.which == 27) {
            $(e.target).blur();
        }
        else {
            var id = this._id;
            var item = $(e.target).val();
            Recipes.update({ _id: id }, { $set: { recipe_name: item } });
        }
    },
    'keyup [id=txt_description]': function (e) {
        e.preventDefault();
        if (e.which == 13 || e.which == 27) {
            $(e.target).blur();
        }
        else {
            var id = this._id;
            var item = $(e.target).val();
            Recipes.update({ _id: id }, { $set: { description: item } });
        }
    },
    'click [name=ingredients_name]': function (e) {
        e.preventDefault();
        var id = this._id;
    },
    'click [name=procedure_name]': function (e) {
        e.preventDefault();
        var id = this._id;
    }

});

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
function updateRecipe() {
    var recipename = $('#recipe_edit').val();
    var desc = $('#desc_edit').val();
    var rID = $('#selectedID').val();
    var rPhoto = $('#imgchoose')[0];
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        _.each(rPhoto.files, function (file) {
            if (file.size > 1) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    // PhotosRecipe.insert({
                    //     name: file.name,
                    //     type: file.type,
                    //     dataUrl: reader.result,
                    //     idrecipe: id_recipe
                    // });
                    Recipes.update({ _id: rID }, { $set: { photo: reader.result } });
                }
                reader.readAsDataURL(file);
            }
        });
    }
    Recipes.update({ _id: rID }, { $set: { recipe_name: recipename, description: desc } });
    Ingredients.find({ recipe_id: rID }).forEach(function (e) {
        Ingredients.remove({ _id: e._id });
    });
    Procedure.find({ recipe_id: rID }).forEach(function (e) {
        Procedure.remove({ _id: e._id });
    });
    temp_Ingredients.find({}).forEach(function (e) {
        Ingredients.insert({
            ingredients_name: e.ingredients_name,
            recipe_id: rID
        });
    });
    temp_Procedure.find({}).forEach(function (e) {
        Procedure.insert({
            procedure_details: e.procedure_details,
            recipe_id: rID
        });
    });
    clearTemps();
    alert("Updated Successfully");
}