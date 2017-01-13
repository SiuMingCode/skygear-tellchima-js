'use strict';

const skygearCloud = require('skygear/cloud');

function generateUserPassword() {
  return Math.random().toString(36).substr(2);
}

function generateChimaSecret() {
  var len = 8,
    str = '';
  for (var i = 0; i < len; i++ ) {
    str += String.fromCharCode( 65 + ~~(Math.random() * 25) );
  }
  return str;
}

function getContainer(userId) {
  const container = new skygearCloud.CloudCodeContainer();
  container.apiKey = skygearCloud.settings.masterKey;
  container.endPoint = skygearCloud.settings.skygearEndpoint + '/';
  container.asUserId = userId;
  return container;
}

function createUser(userName) {
  return getContainer().signupWithUsername(userName, generateUserPassword())
    .then((user) => {
      console.info(`Created user "${user.id}" for "${userName}".`);
      return {
        id: user.id,
        userName: userName
      };
    }, (err) => {
      console.error(`Unable to create user for "${userName}"`, err);
      return err;
    });
}

module.exports = {
  getContainer,
  generateChimaSecret 
};
