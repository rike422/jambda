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

let $ = require('cheerio');

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
    return elem.attribs.src;
  } else if (elem_type === 'a' || elem_type === 'link') {
    return elem.attribs.href;
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
          converted_tags[key] = array_element(elem, $(tags[key][0].elem));
        } else {
          var elem = tags[key][0];
          converted_tags[key] = array_element(elem, $(tags[key][0]));
        }
      } else if (Object.prototype.toString.call(tags[key]) === '[object Object]') {
        var elem = tags[key];
        converted_tags[key] = parse_object(elem, $(tags[key].elem).get(0));
      } else {
        var elem = tags[key];
        converted_tags[key] = get_primary_type($(elem).get(0));
      }
    }
  }

  return converted_tags;
}

module.exports = convert;
