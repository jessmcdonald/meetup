/* eslint-disable strict */
'use strict';

const axios = require('axios');

//MEETUP OAUTH DETAILS
const consumerKey = '7e414fuundrb6s3opmhspmud52'
const consumerSecret = 'ao6evf4lt9k31g4ob965c7eabs';
const redirectURI = 'https://jessmcdonald.github.io/meetup/';

module.exports.getAccessToken = async (event) => {
  console.log("event ====", event)

  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=' + consumerKey
    + '&client_secret=' + consumerSecret
    + '&grant_type=authorization_code'
    + '&redirect_uri=' + redirectURI
    + '&code=' + event.pathParameters.code; // DYNAMIC AUTHORIZATION CODE

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": 'https://jessmcdonald.github.io'
    },
    body: JSON.stringify({
      accessToken: info.data.access_token,
      refreshToken: info.data.refresh_token,
    })
  };
};

module.exports.refreshAccessToken = async (event) => {
  const MEETUP_OAUTH_REFRESH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=' + consumerKey
    + '&client_secret=' + consumerSecret
    + '&grant_type=refresh_token'
    + '&refresh_token=' + event.pathParameters.code;

  const info = await axios.post(MEETUP_OAUTH_REFRESH_URL);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": 'https://jessmcdonald.github.io'
    },
    body: JSON.stringify({
      accessToken: info.data.access_token,
      refreshToken: info.data.refresh_token,
    })
  };
};
