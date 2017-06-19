/**
 * Created by Naomi on 6/15/17.
 */
(function () {
    angular
        .module('WAM')
        .factory('userService', userService)

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        function findUserByCredentials(username, password) {
            for (var index in users){
                console.log(username, password);
                if (username === users[index].username && password === users[index].password){
                    return users[index];
                }
            }
            return null;
        }

        function findUserById(userId) {
            return users.find(function (user) {
                return user._id === userId;
            })
        }

        function createUser(user) {
            user["_id"] = new Date().getMilliseconds().toString();
            users.push(user);
            return user;
        }
        
        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }
        
        function updateUser(userId, user) {
            var userToUpdate = users.find(function (user) {
                return user._id === userId;
            });
            user["_id"] = userToUpdate._id;
            var index = users.indexOf(userToUpdate);
            users[index] = user;

        }

        function deleteUser(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index,1);
        }

        return api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            deleteUser:deleteUser,
            updateUser:updateUser
        };
    }
})();
