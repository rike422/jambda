"use strict";

var _claudiaApiBuilder = require("claudia-api-builder");

var _claudiaApiBuilder2 = _interopRequireDefault(_claudiaApiBuilder);

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _htmlToJson = require("./html-to-json");

var _htmlToJson2 = _interopRequireDefault(_htmlToJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = require('cheerio');

var api = new _claudiaApiBuilder2.default();

function parse(req) {
  return Promise.resolve().then(function () {
    var jsonData = parseRequsetJSON(req);
    return fetchHTML(req.body.url).then(function (body) {
      return (0, _htmlToJson2.default)(jsonData, $.load(body));
    });
  }).catch(function (e) {
    console.log(e);
    return { 'error': e.toString() };
  });
}

function parseRequsetJSON(req) {
  try {
    return JSON.parse(req.body.json_data.replace(/'/g, '"'));
  } catch (e) {
    throw 'invalid JSON';
  }
}

function fetchHTML(url) {
  var response, text;
  return Promise.resolve().then(function () {
    return (0, _nodeFetch2.default)(url);
  }).then(function (_resp) {
    response = _resp;
    return response.text();
  }).then(function (_resp) {
    text = _resp;

    return text;
  });
}

api.post('/jam', parse);
api.get('/jam', function () {
  return 'it works!';
});

module.exports = api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiJCIsInJlcXVpcmUiLCJhcGkiLCJwYXJzZSIsInJlcSIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImpzb25EYXRhIiwicGFyc2VSZXF1c2V0SlNPTiIsImZldGNoSFRNTCIsImJvZHkiLCJ1cmwiLCJsb2FkIiwiY2F0Y2giLCJlIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwiSlNPTiIsImpzb25fZGF0YSIsInJlcGxhY2UiLCJyZXNwb25zZSIsInRleHQiLCJwb3N0IiwiZ2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBLElBQU1BLElBQUlDLFFBQVEsU0FBUixDQUFWOztBQUVBLElBQU1DLE1BQU0saUNBQVo7O0FBRUEsU0FBU0MsS0FBVCxDQUFlQyxHQUFmLEVBQW9CO0FBQ2xCLFNBQU9DLFFBQVFDLE9BQVIsR0FBa0JDLElBQWxCLENBQXVCLFlBQU07QUFDbEMsUUFBTUMsV0FBV0MsaUJBQWlCTCxHQUFqQixDQUFqQjtBQUNBLFdBQU9NLFVBQVVOLElBQUlPLElBQUosQ0FBU0MsR0FBbkIsRUFBd0JMLElBQXhCLENBQTZCLFVBQUNJLElBQUQsRUFBVTtBQUM1QyxhQUFPLDBCQUFRSCxRQUFSLEVBQWtCUixFQUFFYSxJQUFGLENBQU9GLElBQVAsQ0FBbEIsQ0FBUDtBQUNELEtBRk0sQ0FBUDtBQUdELEdBTE0sRUFLSkcsS0FMSSxDQUtFLFVBQUNDLENBQUQsRUFBTztBQUNkQyxZQUFRQyxHQUFSLENBQVlGLENBQVo7QUFDQSxXQUFPLEVBQUUsU0FBU0EsRUFBRUcsUUFBRixFQUFYLEVBQVA7QUFDRCxHQVJNLENBQVA7QUFTRDs7QUFFRCxTQUFTVCxnQkFBVCxDQUEwQkwsR0FBMUIsRUFBK0I7QUFDN0IsTUFBSTtBQUNGLFdBQU9lLEtBQUtoQixLQUFMLENBQVdDLElBQUlPLElBQUosQ0FBU1MsU0FBVCxDQUFtQkMsT0FBbkIsQ0FBMkIsSUFBM0IsRUFBaUMsR0FBakMsQ0FBWCxDQUFQO0FBQ0QsR0FGRCxDQUVFLE9BQU9OLENBQVAsRUFBVTtBQUNWLFVBQU0sY0FBTjtBQUNEO0FBQ0Y7O0FBRUQsU0FBZUwsU0FBZixDQUF5QkUsR0FBekI7QUFBQTtBQUFBO0FBQUEsV0FDeUIseUJBQU1BLEdBQU4sQ0FEekI7QUFBQTtBQUNRVSxZQURSO0FBQUEsV0FFcUJBLFNBQVNDLElBQVQsRUFGckI7QUFBQTtBQUVRQSxRQUZSOztBQUdFLFdBQU9BLElBQVA7QUFIRjtBQUFBOztBQU1BckIsSUFBSXNCLElBQUosQ0FBUyxNQUFULEVBQWlCckIsS0FBakI7QUFDQUQsSUFBSXVCLEdBQUosQ0FBUSxNQUFSLEVBQWdCLFlBQU07QUFDcEIsU0FBTyxXQUFQO0FBQ0QsQ0FGRDs7QUFJQUMsT0FBT0MsT0FBUCxHQUFpQnpCLEdBQWpCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBUEkgZnJvbSBcImNsYXVkaWEtYXBpLWJ1aWxkZXJcIjtcbmltcG9ydCBmZXRjaCBmcm9tIFwibm9kZS1mZXRjaFwiO1xuaW1wb3J0IGNvbnZlcnQgZnJvbSBcIi4vaHRtbC10by1qc29uXCI7XG5jb25zdCAkID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuXG5jb25zdCBhcGkgPSBuZXcgQVBJKClcblxuZnVuY3Rpb24gcGFyc2UocmVxKSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICBjb25zdCBqc29uRGF0YSA9IHBhcnNlUmVxdXNldEpTT04ocmVxKVxuICAgIHJldHVybiBmZXRjaEhUTUwocmVxLmJvZHkudXJsKS50aGVuKChib2R5KSA9PiB7XG4gICAgICByZXR1cm4gY29udmVydChqc29uRGF0YSwgJC5sb2FkKGJvZHkpKVxuICAgIH0pXG4gIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZSlcbiAgICByZXR1cm4geyAnZXJyb3InOiBlLnRvU3RyaW5nKCkgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBwYXJzZVJlcXVzZXRKU09OKHJlcSkge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJlcS5ib2R5Lmpzb25fZGF0YS5yZXBsYWNlKC8nL2csICdcIicpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93ICdpbnZhbGlkIEpTT04nXG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hIVE1MKHVybCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KClcbiAgcmV0dXJuIHRleHRcbn1cblxuYXBpLnBvc3QoJy9qYW0nLCBwYXJzZSlcbmFwaS5nZXQoJy9qYW0nLCAoKSA9PiB7XG4gIHJldHVybiAnaXQgd29ya3MhJ1xufSlcblxubW9kdWxlLmV4cG9ydHMgPSBhcGk7XG4iXX0=