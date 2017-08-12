/**
 * Created by Naomi on 8/11/17.
 */
(function () {
    angular
        .module('MyProject')
        .controller('userEditController', userEditController);

    function userEditController($location, userService, currentUser, $routeParams) {
        var model = this;
        if (currentUser) {
            userService.setCurrentUser(currentUser);
        }

        function init() {
            (function(){
                'use strict';
                var $ = jQuery;
                $.fn.extend({
                    filterTable: function(){
                        return this.each(function(){
                            $(this).on('keyup', function(e){
                                $('.filterTable_no_results').remove();
                                var $this = $(this),
                                    search = $this.val().toLowerCase(),
                                    target = $this.attr('data-filters'),
                                    $target = $(target),
                                    $rows = $target.find('tbody tr');

                                if(search == '') {
                                    $rows.show();
                                } else {
                                    $rows.each(function(){
                                        var $this = $(this);
                                        $this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
                                    })
                                    if($target.find('tbody tr:visible').size() === 0) {
                                        var col_count = $target.find('tr').first().find('td').size();
                                        var no_results = $('<tr class="filterTable_no_results"><td colspan="'+col_count+'">No results found</td></tr>')
                                        $target.find('tbody').append(no_results);
                                    }
                                }
                            });
                        });
                    }
                });
                $('[data-action="filter"]').filterTable();
            })(jQuery);

            $(function(){
                // attach table filter plugin to inputs
                $('[data-action="filter"]').filterTable();

                $('.container').on('click', '.panel-heading span.filter', function(e){
                    var $this = $(this),
                        $panel = $this.parents('.panel');

                    $panel.find('.panel-body').slideToggle();
                    if($this.css('display') != 'none') {
                        $panel.find('.panel-body input').focus();
                    }
                });
                $('[data-toggle="tooltip"]').tooltip();
            });

            userService.getAllUsers()
                .then(function (data) {
                    model.users = data;
                });

            if ($routeParams.userId && $routeParams.userId!="new") {
                userService.findUserById($routeParams.userId)
                    .then(function (data) {
                        model.user = data;
                    });
                model.isUpdate = true;
            }

        }

        model.updateUser = function (user) {
            if (user){
                userService.updateUser(user._id, user)
                    .then(function (response) {
                        $location.url("/users");
                    })
            }
        };

        model.deleteUser = function (user) {
            if (user){
                userService.deleteUser(user._id)
                    .then(function (response) {
                        $location.url("/users");
                    });
            }
        };

        model.createUser = function (user) {
            console.log(user.roles);
            if(!user.firstName || !user.lastName|| !user.username || !user.password || !user.roles) {
                model.message = "Fields cannot be blank";
                return;
            }
            userService.findUserByUsername(user.username)
                .then(function (data) {
                    if (!data){
                        if (user.password === user.conPassword){
                            model.user = user;
                            userService.createUser(model.user)
                                .then(function (response) {
                                    $location.url("/users");
                                });
                        } else {
                            model.message = "Passwords do not match. Please try again"

                        }
                    } else {
                        model.message = "Username already exists. Please choose another";

                    }
                });
        };

        init();
    }
})();