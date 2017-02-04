'use strict';

/*
Jam API
Copyright (C) 2016 Gavin Dinubilo

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var $ = require('cheerio');

function parse_object(obj, elem) {
  var temp_obj = {};
  delete obj.elem;
  for (var key in obj) {
    if (obj[key] === 'text') {
      temp_obj[key] = $(elem).text().trim();
    } else if (obj[key] === 'html') {
      temp_obj[key] = $(elem).html().trim();
    } else {
      temp_obj[key] = elem.attribs[obj[key]];
    }
  }
  return temp_obj;
}

function get_primary_type(elem) {
  var elem_type = elem.name;
  if (elem_type === 'img') {
    return elem.attribs['src'];
  } else if (elem_type === 'a' || elem_type === 'link') {
    return elem.attribs['href'];
  }
  return $(elem).text().trim();
}

function array_element(obj, elems) {
  var temp_tags = elems;
  var temp_array = [];
  for (var i = 0; i < temp_tags.length; i++) {
    var temp_obj = {};
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      temp_obj = parse_object(obj, temp_tags.get(i));
      temp_array.push(temp_obj);
    } else {
      temp_obj = get_primary_type(temp_tags.get(i));
      temp_array.push(temp_obj);
    }
  }
  return temp_array;
}

function convert(tags, $) {
  var converted_tags = {};

  for (var key in tags) {
    if (tags.hasOwnProperty(key)) {
      if (Array.isArray(tags[key])) {
        if (Object.prototype.toString.call(tags[key][0]) === '[object Object]') {
          var elem = tags[key][0];
          converted_tags[key] = array_element(elem, $(tags[key][0]['elem']));
        } else {
          var elem = tags[key][0];
          converted_tags[key] = array_element(elem, $(tags[key][0]));
        }
      } else if (Object.prototype.toString.call(tags[key]) === '[object Object]') {
        var elem = tags[key];
        converted_tags[key] = parse_object(elem, $(tags[key]['elem']).get(0));
      } else {
        var elem = tags[key];
        converted_tags[key] = get_primary_type($(elem).get(0));
      }
    }
  }

  return converted_tags;
}

module.exports = convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9odG1sLXRvLWpzb24uanMiXSwibmFtZXMiOlsiJCIsInJlcXVpcmUiLCJwYXJzZV9vYmplY3QiLCJvYmoiLCJlbGVtIiwidGVtcF9vYmoiLCJrZXkiLCJ0ZXh0IiwidHJpbSIsImh0bWwiLCJhdHRyaWJzIiwiZ2V0X3ByaW1hcnlfdHlwZSIsImVsZW1fdHlwZSIsIm5hbWUiLCJhcnJheV9lbGVtZW50IiwiZWxlbXMiLCJ0ZW1wX3RhZ3MiLCJ0ZW1wX2FycmF5IiwiaSIsImxlbmd0aCIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImdldCIsInB1c2giLCJjb252ZXJ0IiwidGFncyIsImNvbnZlcnRlZF90YWdzIiwiaGFzT3duUHJvcGVydHkiLCJBcnJheSIsImlzQXJyYXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBSUEsSUFBSUMsUUFBUSxTQUFSLENBQVI7O0FBRUEsU0FBU0MsWUFBVCxDQUFzQkMsR0FBdEIsRUFBMkJDLElBQTNCLEVBQWlDO0FBQy9CLE1BQUlDLFdBQVcsRUFBZjtBQUNBLFNBQU9GLElBQUlDLElBQVg7QUFDQSxPQUFLLElBQUlFLEdBQVQsSUFBZ0JILEdBQWhCLEVBQXFCO0FBQ25CLFFBQUlBLElBQUlHLEdBQUosTUFBYSxNQUFqQixFQUF5QjtBQUN2QkQsZUFBU0MsR0FBVCxJQUFnQk4sRUFBRUksSUFBRixFQUFRRyxJQUFSLEdBQWVDLElBQWYsRUFBaEI7QUFDRCxLQUZELE1BRU8sSUFBSUwsSUFBSUcsR0FBSixNQUFhLE1BQWpCLEVBQXlCO0FBQzlCRCxlQUFTQyxHQUFULElBQWdCTixFQUFFSSxJQUFGLEVBQVFLLElBQVIsR0FBZUQsSUFBZixFQUFoQjtBQUNELEtBRk0sTUFFQTtBQUNMSCxlQUFTQyxHQUFULElBQWdCRixLQUFLTSxPQUFMLENBQWFQLElBQUlHLEdBQUosQ0FBYixDQUFoQjtBQUNEO0FBQ0Y7QUFD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Q0FBWixDQUFqQixDQUF0QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFPSSxjQUFQO0FBQ0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUJQLE9BQWpCIiwiZmlsZSI6Imh0bWwtdG8tanNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5KYW0gQVBJXG5Db3B5cmlnaHQgKEMpIDIwMTYgR2F2aW4gRGludWJpbG9cblxuVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbml0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG50aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG5idXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbmFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxubGV0ICQgPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5cbmZ1bmN0aW9uIHBhcnNlX29iamVjdChvYmosIGVsZW0pIHtcbiAgdmFyIHRlbXBfb2JqID0ge307XG4gIGRlbGV0ZSBvYmouZWxlbTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChvYmpba2V5XSA9PT0gJ3RleHQnKSB7XG4gICAgICB0ZW1wX29ialtrZXldID0gJChlbGVtKS50ZXh0KCkudHJpbSgpO1xuICAgIH0gZWxzZSBpZiAob2JqW2tleV0gPT09ICdodG1sJykge1xuICAgICAgdGVtcF9vYmpba2V5XSA9ICQoZWxlbSkuaHRtbCgpLnRyaW0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcF9vYmpba2V5XSA9IGVsZW0uYXR0cmlic1tvYmpba2V5XV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0ZW1wX29iajtcbn1cblxuZnVuY3Rpb24gZ2V0X3ByaW1hcnlfdHlwZShlbGVtKSB7XG4gIHZhciBlbGVtX3R5cGUgPSBlbGVtLm5hbWU7XG4gIGlmIChlbGVtX3R5cGUgPT09ICdpbWcnKSB7XG4gICAgcmV0dXJuIGVsZW0uYXR0cmlic1snc3JjJ107XG4gIH0gZWxzZSBpZiAoZWxlbV90eXBlID09PSAnYScgfHwgZWxlbV90eXBlID09PSAnbGluaycpIHtcbiAgICByZXR1cm4gZWxlbS5hdHRyaWJzWydocmVmJ107XG4gIH1cbiAgcmV0dXJuICQoZWxlbSkudGV4dCgpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlfZWxlbWVudChvYmosIGVsZW1zKSB7XG4gIHZhciB0ZW1wX3RhZ3MgPSBlbGVtcztcbiAgdmFyIHRlbXBfYXJyYXkgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wX3RhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGVtcF9vYmogPSB7fVxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHRlbXBfb2JqID0gcGFyc2Vfb2JqZWN0KG9iaiwgdGVtcF90YWdzLmdldChpKSk7XG4gICAgICB0ZW1wX2FycmF5LnB1c2godGVtcF9vYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wX29iaiA9IGdldF9wcmltYXJ5X3R5cGUodGVtcF90YWdzLmdldChpKSk7XG4gICAgICB0ZW1wX2FycmF5LnB1c2godGVtcF9vYmopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGVtcF9hcnJheTtcbn1cblxuZnVuY3Rpb24gY29udmVydCh0YWdzLCAkKSB7XG4gIHZhciBjb252ZXJ0ZWRfdGFncyA9IHt9O1xuXG4gIGZvciAodmFyIGtleSBpbiB0YWdzKSB7XG4gICAgaWYgKHRhZ3MuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFnc1trZXldKSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRhZ3Nba2V5XVswXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgdmFyIGVsZW0gPSB0YWdzW2tleV1bMF07XG4gICAgICAgICAgY29udmVydGVkX3RhZ3Nba2V5XSA9IGFycmF5X2VsZW1lbnQoZWxlbSwgJCh0YWdzW2tleV1bMF1bJ2VsZW0nXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBlbGVtID0gdGFnc1trZXldWzBdO1xuICAgICAgICAgIGNvbnZlcnRlZF90YWdzW2tleV0gPSBhcnJheV9lbGVtZW50KGVsZW0sICQodGFnc1trZXldWzBdKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRhZ3Nba2V5XSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIHZhciBlbGVtID0gdGFnc1trZXldO1xuICAgICAgICBjb252ZXJ0ZWRfdGFnc1trZXldID0gcGFyc2Vfb2JqZWN0KGVsZW0sICQodGFnc1trZXldWydlbGVtJ10pLmdldCgwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZWxlbSA9IHRhZ3Nba2V5XTtcbiAgICAgICAgY29udmVydGVkX3RhZ3Nba2V5XSA9IGdldF9wcmltYXJ5X3R5cGUoJChlbGVtKS5nZXQoMCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb252ZXJ0ZWRfdGFncztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJ0O1xuIl19