/**
 * @author      PoulycrocStudio <poulycroc.studio@gmail.com>
 */

/**
 * Check if element is null or undefined
 * @param {*} any - String to convert
 * @return {Boolean}
 */
const isNil = any => {
  return any === undefined || any === null;
};

/**
 * Check if element is an object
 * @param {*} any - String to convert
 * @return {Boolean}
 */
const isObj = any => {
  if (isNil(any)) return;
  return typeof any === "object";
};

/**
 * Select only element from model object
 * @param {Object} model - ex: { fname:null, lname:null }
 * @param {Object} object - ex: { fname:"xyz", lname:"abc", age:23 }
 * @return {Object} - ex: { fname:"xyz", lname:"abc" }
 */
const objPick = (model, object) => {
  const res = {};
  Object.keys(model).forEach(key => (res[key] = object[key]));
  return res;
};

/**
 * generating embed vo
 * @param {Number} url - url's video
 * @return {String}
 */
const embedYtVideo = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return "error";
  }
};

/**
 * @param {Array} arr
 * @return {Array}
 */
const removeDuplicates = arr => {
  const uniques = [];
  arr.forEach(e => {
    if (!uniques.includes(e)) uniques.push(e);
  });
  return uniques;
};

/**
 * generate a random string
 * @param {Number} length - length of random string
 * @return {String}
 */
const makeKey = length => {
  const n = length === undefined ? 6 : length;
  let result = "";
  const chr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const chrLength = chr.length;
  for (let i = 0; i < n; i++) {
    result += chr.charAt(Math.floor(Math.random() * chrLength));
  }
  return result;
};

/**
 * Check if element is null or undefined
 * @param {*} any - String to convert
 * @return {Boolean}
 */
const isBlank = str => {
  return !str || /^\s*$/.test(str);
};

/**
 * Check if object or array is empty
 * @param {Array or Object} elem
 * @return {Boolean}
 */
const isEmpty = elem => {
  if (!isNil(elem)) {
    if (isObj(elem)) {
      return Object.entries(elem).length === 0 && elem.constructor === Object;
    } else if (Array.isArray(elem)) {
      return elem.length === 0;
    } else {
      throw new Error("Only accept 'Array' or 'Object'");
    }
  } else {
    throw new Error("Can't check if 'null' or 'undefined' is empty");
  }
};

/**
 * Check if is valid date
 * @param {String} date
 * @return {Boolean}
 */
const isValidDate = date => {
  return date instanceof Date && !isNaN(date);
};

/**
 * Convert string to lowercase
 * @param {String} str - String to convert
 * @return {String}
 */
const lower = str => {
  return str.toLowerCase();
};

/**
 * get Children's object by position
 * @param {Object} obj - Object to pars
 * @param {Number} numb - Children position we want
 * @return {Object}
 */
const getChildrenN = (obj, numb) => {
  if (isNil(obj) && !isObj(obj)) return;
  if (isNil(numb)) return;
  const keys = Object.keys(obj);
  const key = keys[numb];
  return obj[key];
};

/**
 * Convert CamelCaseString to kebab-case-string
 * @param {String} str - String to convert
 * @return {String}
 */
const toKebabCase = str => {
  if (isNil(str)) return;
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

/**
 * @param {Object} obj - String to convert
 * @return {String}
 */
const getObjKeyName = obj => {
  if (isNil(obj) && !isObj(obj)) return;
  return Object.keys(obj)[0];
};

/**
 * Convert number like '2' into '02'
 * @param {Number or String} int
 * @return {String}
 */
const addZero = int => {
  return int < 10 ? `0${int}` : int;
};

/**
 * First letter in uppercase
 * @param {String} str
 * @return {String}
 */
const capitalize = str => {
  if (isNil(str)) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Omit one or multiple keys from Object
 *
 * Inspiret from lodash'omit helper
 * @param {Array} keys
 * @param {Object} obj
 */
const omit = (keys, obj) => {
  const _o = Object.entries(obj);
  return Object.fromEntries(_o.filter(([k]) => !keys.includes(k)));
};

/**
 * Detect if it's an Array or Object
 * @param {Object or Array} a
 * @param {Object or Array} b
 * @return {Boolean}
 */
const isEqual = (a, b) => {
  if (!["object", "array"].includes(typeof a))
    throw new Error("Can only compare 'Arrays' or 'Object'");

  Object.compare = function(obj1, obj2) {
    //Loop through properties in object 1
    for (var p in obj1) {
      //Check property exists on both objects
      if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

      switch (typeof obj1[p]) {
        //Deep compare objects
        case "object":
          if (!Object.compare(obj1[p], obj2[p])) return false;
          break;
        //Compare function code
        case "function":
          if (
            typeof obj2[p] == "undefined" ||
            (p != "compare" && obj1[p].toString() != obj2[p].toString())
          )
            return false;
          break;
        //Compare values
        default:
          if (obj1[p] != obj2[p]) return false;
      }
    }

    //Check object 2 for any extra properties
    for (var p in obj2) if (typeof obj1[p] == "undefined") return false;
    return true;
  };

  Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array) return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length) return false;

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] != array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  };

  const isObject = isObj(a) && isObj(b);
  const isArray = Array.isArray(a) && Array.isArray(b);

  if (isObject) return Object.compare(a, b);
  if (isArray) return a.equals(b);

  return false;
};

module.exports = {
  isNil,
  isObj,
  isBlank,
  isEmpty,
  isValidDate,
  objPick,
  embedYtVideo,
  makeKey,
  lower,
  getChildrenN,
  toKebabCase,
  getObjKeyName,
  removeDuplicates,
  addZero,
  capitalize,
  omit,
  isEqual
};
