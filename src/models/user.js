import parse, {ParseModel} from '../parse';
var $ = require('jquery');
var Backbone = require('backbone');


var User = ParseModel.extend({
  urlRoot: 'https://dietz-server.herokuapp.com/users'
}, {
  login: function(cridentials, callback){
    var url = 'https://dietz-server.herokuapp.com/login?' + $.param(cridentials);

    parse.initialize();

    $.get(url).then(data => {
      var newUser = new User(data);
      User.store(newUser);
      callback(newUser);
    });

    parse.deinitialize();
  },
  logout: function(callback){
    var url = 'https://dietz-server.herokuapp.com/logout';

    parse.initialize();

    $.post(url).then(data => {
      localStorage.removeItem('user');
      callback();
    });

    parse.deinitialize();
  },
  signup: function(creds, callback){
    var newUser = new User(creds);
    return newUser.save().then(() => {
      User.store(newUser);
      callback(newUser);
    });
    // return newUser;
  },
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  current: function(){
    var user = localStorage.getItem('user');

    // if no user in local storage, bail
    if(!user){
      return false;
    }

    var currentUser = new User(JSON.parse(user));

    // If we don't have a token, bail
    if(!currentUser.get('sessionToken')){
      return false;
    }

    return currentUser;
  }
});

export default User;
