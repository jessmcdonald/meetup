"use strict";

const axios = require("axios");

module.exports.getAccessToken = async event => {
  const MEETUP_OAUTH_URL =
    "https://secure.meetup.com/oauth2/access" +
    "?client_id=7e414fuundrb6s3opmhspmud52" +
    "&client_secret=ao6evf4lt9k31g4ob965c7eabs" +
    "&grant_type=authorization_code" +
    "&redirect_uri=https://jessmcdonald.github.io/meetup/" +
    "&code=" +
    event.pathParameters.code;

  const info = await axios.post(MEETUP_OATH_URL);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token
    })
  };
};

module.exports.refreshAccessToken = async event => {
  const MEETUP_OAUTH_URL =
    "https://secure.meetup.com/oauth2/access" +
    "?client_id=7e414fuundrb6s3opmhspmud52" +
    "&client_secret=ao6evf4lt9k31g4ob965c7eabs" +
    "&grant_type=refresh_token" +
    "&refresh_token=" +
    event.pathParameters.code;

  const info = await axios.post(MEETUP_OATH_URL);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token
    })
  };
};
