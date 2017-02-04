import API from 'claudia-api-builder';
import fetch from 'node-fetch';
import convert from './html-to-json';
const $ = require('cheerio');

const api = new API();

function parse(req) {
  return Promise.resolve().then(() => {
    const jsonData = parseRequsetJSON(req);
    return fetchHTML(req.body.url).then(body => {
      return convert(jsonData, $.load(body));
    });
  }).catch(e => {
    console.log(e);
    return {error: e.toString()};
  });
}

function parseRequsetJSON(req) {
  try {
    return JSON.parse(req.body.json_data.replace(/'/g, '"'));
  } catch (e) {
    throw 'invalid JSON';
  }
}

async function fetchHTML(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

api.post('/jam', parse);
api.get('/jam', () => {
  return 'it works!';
});

module.exports = api;
