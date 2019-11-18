import { mockEvents } from "./mock-events";
import axios from 'axios';

//api calls are asyncronous
async function getSuggestions(query) {
  if (window.location.href.startsWith('http://localhost')) {

    return [
      {
        city: "Munich",
        country: "de",
        localized_country_name: "Germany",
        name_string: "Munich, Germany",
        zip: "meetup3",
        lat: 48.14,
        lon: 11.58
      },
      {
        city: "Munich",
        country: "us",
        localized_country_name: "USA",
        state: "ND",
        name_string: "Munich, North Dakota, USA",
        zip: "58352",
        lat: 48.66,
        lon: -98.85
      }
    ];
  }

  const token = await getAccessToken();
  if (token) {
    const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=' + query + '&access_token=' + token;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
}


async function getEvents(lat, lon, page) {
  if (window.location.href.startsWith('http://localhost')) {
    return mockEvents.events;
  }

  const token = await getAccessToken();

  if (token) {
    let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public' + '&access_token=' + token;
    //lat, lon is optional, if have lat & lon can add them
    if (lat && lon) {
      url += '&lat=' + lat + '&lon=' + lon;
    }
    if (page) {
      url += '&page=' + page;
    }
    const result = await axios.get(url);
    return result.data.events;
  }

}

function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  const lastSavedTime = localStorage.getItem('lastSavedTime');
  const refreshToken = localStorage.getItem('refresh_token');

  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (!code) {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=7e414fuundrb6s3opmhspmud52&response_type=code&redirect_uri=https://jessmcdonald.github.io/meetup/';
      return null;
    }
    return getOrRenewAccessToken('get', code);
  }

  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }

  //if access_code expired try to renew with refresh_token
  return getOrRenewAccessToken('renew', refreshToken);

};

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === 'get') {
    //lambda endpoint to get token by code
    url = 'https://riqfexrptk.execute-api.eu-central-1.amazonaws.com/dev/api/token/' + key;
  } else if (type === 'renew') {
    //lambda endpoint to refresh token by refresh_token
    url = 'https://riqfexrptk.execute-api.eu-central-1.amazonaws.com/dev/api/refresh/' + key;
  }
  //use axios to make GET request to endpoint
  const tokenInfo = await axios.get(url);

  //save tokens to localStorage together with timestamp
  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());

  //return access_token
  return tokenInfo.data.access_token;
}



export { getSuggestions, getEvents };
