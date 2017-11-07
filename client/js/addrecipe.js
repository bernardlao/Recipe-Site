var ingredients_list = [];
var procedure_list = [];
var getdata;

Template.addrecipe.helpers({
      'temp_ingredients': function () {
            return temp_Ingredients.find({}, { sort: { temp_ingredients: -1 } });
      }, 'temp_procedure': function () {
            return temp_Procedure.find({}, { sort: { _id: 1 } });
      },
      'category_name': function () {
            return Category.find({}, { sort: { name: -1 } })
      }
});
Template.addrecipe.created = function () {
    clearTemps();
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
Template.addrecipe.events({
      'change #img_choose': function (e) {
            e.preventDefault();
            var rPhoto = $('#img_choose')[0];
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                  _.each(rPhoto.files, function (file) {
                        if (file.size > 1) {
                              var reader = new FileReader();
                              reader.onload = function (e) {
                                    $('#img_upload').attr('src', reader.result);
                              }
                              reader.readAsDataURL(file);
                        }
                  });
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
                        if (temp_Procedure.find({ temp_proce: input }).count() == 0) {
                              temp_Procedure.insert({
                                    temp_proce: input
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
            if (confirm("Are you sure you want to delete this procedure ? '" + this.temp_proce + "'?")) {
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
                  temp_Procedure.update({ _id: id }, { $set: { temp_proce: item } });
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
      },
      'click [id=btnSaveRecipe]': function (e) {
            e.preventDefault();
            var recipename = $('#txt_recipe').val();
            var s_Category = $('#recipe_category').val();
            var desc = $('#txt_description').val();

      },
      'click #btnSaveRecipe': function (event, template) {
            event.preventDefault();

            var r_name = $('#txt_recipe').val();
            var r_category = $('#re_category').val();
            var r_desc = $('#desc').val();
            var r_userid = $('#login_user').val();

            if (r_name.trim().toString().length != 0 && r_category.trim.toString().length != 0
                  && r_desc.trim().toString().length != 0 && r_userid.trim().toString().length != 0
                  && temp_Ingredients.find({}).count() != 0 && temp_Procedure.find({}).count() != 0) {
                  if (Recipes.find({ recipe_name: r_name }, { user_id: r_userid }).count() == 0) {
                        var callback = Recipes.insert({
                              recipe_name: r_name,
                              description: r_desc,
                              category_name: r_category,
                              user_id: r_userid,
                              likes: 0,
                              photo: 'images/cupcake.jpg'
                        }, callback)
                        id_recipe = callback;
                        if (window.File && window.FileReader && window.FileList && window.Blob) {
                              _.each(template.find('#img_choose').files, function (file) {
                                    if (file.size > 1) {
                                          var reader = new FileReader();
                                          reader.onload = function (e) {
                                                // PhotosRecipe.insert({
                                                //       name: file.name,
                                                //       type: file.type,
                                                //       dataUrl: reader.result,
                                                //       idrecipe: id_recipe
                                                // });
                                                Recipes.update({ _id: id_recipe }, { $set: { photo: reader.result } });
                                          }
                                          reader.readAsDataURL(file);
                                    }
                              });
                        }

                        temp_Ingredients.find({}).forEach(
                              function (ee) {
                                    ingredients_list.push(ee.ingredients_name);
                                    temp_Ingredients.remove({ _id: ee._id });
                              }
                        );
                        for (var i = 0; i < ingredients_list.length; i++) {
                              Ingredients.insert({
                                    ingredients_name: ingredients_list[i].toString(),
                                    recipe_id: id_recipe
                              });
                        } while (ingredients_list.length > 0) { ingredients_list.pop() }

                        temp_Procedure.find({}).forEach(
                              function (e) {
                                    procedure_list.push(e.temp_proce);
                                    temp_Procedure.remove({ _id: e._id });
                              }
                        );
                        for (var j = 0; j < procedure_list.length; j++) {
                              Procedure.insert({
                                    procedure_details: procedure_list[j].toString(),
                                    recipe_id: id_recipe
                              });
                        } while (procedure_list.length > 0) { procedure_list.pop() }
                        alert('Recipe details successfully saved!')
                        $('#txt_recipe').val('');
                        $('#desc').val('');

                  }else {alert("Recipe name already exist");}
            } else { alert('Please complete the whole form') }
      },
});


$(document).ready(function () {

      $(document).on('change', '.btn-file :file', function () {
            var input = $(this),
                  label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [label]);
      });

      $('.btn-file :file').on('fileselect', function (event, label) {

            var input = $(this).parents('.input-group').find(':text'),
                  log = label;

            if (input.length) {
                  input.val(log);
            } else {
                  if (log) alert(log);
            }

      });

      function readURL(input) {
            if (input.files && input.files[0]) {
                  var reader = new FileReader();

                  reader.onload = function (e) {
                        $('#img-upload').attr('src', e.target.result);
                  }

                  reader.readAsDataURL(input.files[0]);
            }
      }

      $("#imgInp").change(function () {
            readURL(this);
      });
      $("#clear").click(function () {
            $('#img-upload').attr('src', '');
            $('#urlname').val('');
      });
});

