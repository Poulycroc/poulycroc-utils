/**
 * @author      PoulycrocStudio <poulycroc.studio@gmail.com>
 */

/**
 * Check if element is null or undefined
 * @param {*} any - String to convert
 * @return {Boolean}
 */
const isNil = (any) => {
  return (
    any === undefined || any === null || any === "undefined" || any === "null"
  );
};

/**
 * Check if element is an object
 * @param {*} any
 * @return {Boolean}
 */
const isObj = (any) => {
  if (isNil(any)) return false;
  return typeof any === "object" && !Array.isArray(any);
};

/**
 * Select only element from model object
 * @param {Object} model - ex: { fname:null, lname:null }
 * @param {Object} object - ex: { fname:"xyz", lname:"abc", age:23 }
 * @return {Object} - ex: { fname:"xyz", lname:"abc" }
 */
const objPick = (model, object) => {
  if (isNil(model) || isNil(object)) return null;
  const res = {};
  Object.keys(model).forEach((key) => (res[key] = object[key]));
  return res;
};

/**
 * Check if element is null or undefined
 * @param {*} any - String to convert
 * @return {Boolean}
 */
const isBlank = (str) => {
  return !str || /^\s*$/.test(str);
};

/**
 * Check if object or array is empty
 * @param {Array or Object} elem
 * @return {Boolean}
 */
const isEmpty = (elem) => {
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
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
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
 * @param {Object} obj - String to convert
 * @return {String}
 */
const getObjKeyName = (obj) => {
  if (isNil(obj) && !isObj(obj)) return;
  return Object.keys(obj)[0];
};

/**
 * Omit one or multiple keys from Object
 *
 * Inspiret from lodash'omit helper
 * @param {Array} keys
 * @param {Object} obj
 */
const omit = (keys, obj) => {
  if (isNil(keys) || isNil(obj)) return null;
  if (!isObj(obj) || !Array.isArray(keys)) return null;
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
  if (arguments.length < 2) throw Error("You only can compar 2 element");

  Object.compare = function (obj1, obj2) {
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
    for (var p in obj2) if (isNil(obj1[p])) return false;
    return true;
  };

  Array.prototype.equals = function (array) {
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

  throw new Error("Can only compare 'Arrays' or 'Object'");
};

/**
 * @param {Array or Object} source
 * @return {*}
 */
const deepCopy = (source) => {
  if (!isObj(source)) return source;
  const result = {};
  for (let key in source) {
    result[key] =
      typeof source[key] === "object"
        ? this.deepCopy(source[key])
        : source[key];
  }
  return result;
};

/**
 * transform string in Object path
 * @param source {Array|Object}
 * @param string {String}
 * @returns Object path
 */
const convertStringToPropGetter = (source, string) => {
  if (isNil(string)) return;
  return string.split(".").reduce((o, i) => o[i], source);
};

/**
 * Gonna rend a string of params
 * @param {Object} obj
 * @return {String}
 */
const constructQueries = (obj) => {
  const arr = [];
  Object.keys(obj).forEach((key) => arr.push(`${key}=${obj[key]}`));
  return arr.join("&");
};

/**
 * Get child object form value
 * from Object or Array
 *
 * only use if your value is inside a object
 *
 * @param {Array or Object} focus
 * @param {String} keyName - in wich key
 * @param {Any} value - searched value
 * @return {Object}
 */
const getObjectFromValue = (focus, keyName, value) => {
  if (isNil(focus) || isNil(keyName) || isNil(value)) return null;

  let res = null;
  if (Array.isArray(focus)) {
    focus.forEach((elem) => {
      if (elem[keyName] === value) res = elem;
    });
  } else {
    Object.keys(focus).forEach((elem) => {
      if (focus[elem][keyName] === value) res = focus[elem];
    });
  }
  return res;
};

/**
 * Return only object's keys needed
 * @param {Array} keys
 * @param {Object} obj
 * @return {Object}
 */
const only = (keys, obj) => {
  if (isNil(keys) || isNil(obj))
    throw new Error("'keys' or 'obj' can't be 'null' or 'undefined'");
  if (!Array.isArray(keys)) throw new Error("First param need to be an Array");
  if (!isObj(obj)) throw new Error("Second param need to be an Object");

  const res = {};
  keys.forEach((key) => {
    Object.assign(res, { [key]: obj[key] });
  });
  return res;
};

/**
 * @param {String} string
 * @return {Boolean}
 */
const isDigitsOnly = (string) => {
  return [...string].every((c) => "0123456789".includes(c));
};

/**
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
const hasOwnProperty = (obj, key) => {
  if (isNil(obj) || isNil(key)) return false;
  if (!isObj(obj)) throw new Error("First param need to be an 'Object'");
  return Object.prototype.hasOwnProperty.call(obj, key);
};

/**
 * @param {Object} source
 * @param {Boolean} condition
 * @param {Object} merge
 * @return {Object}
 */
const mergeObjIf = (source = {}, condition = false, merge = {}) => {
  if (isNil(source) || isNil(merge))
    throw new Error("Can't merge 'null' or 'undefined'");

  if (!isObj(source) || !isObj(merge))
    throw new Error("Can only merge 'Object'");

  const _m = condition ? merge : {};
  return Object.assign({}, source, _m);
};

const groupByKey = (array, key) => {
  return array.reduce((hash, obj) => {
    if (isNil(obj[key])) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
};

/**
 * Remove duplicated value from array
 * @param {Array} arr
 * @return {Array}
 */
const removeDuplicates = (arr) => {
  if (isNil(arr)) throw new Error("Can't work on undifined value");
  if (!Array.isArray(arr)) throw new Error("Only accept 'Array'");
  const uniques = [];
  arr.forEach((e) => {
    if (!uniques.includes(e)) uniques.push(e);
  });
  return uniques;
};

/**
 * @param {Array} arr
 * @param {Number} val
 * @return {*}
 */
const arrIndexOf = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
};

/**
 * generate a random string
 * @param {Number} length - length of random string
 * @return {String}
 */
const makeKey = (length) => {
  const n = isNil(length) ? 6 : length;
  let result = "";
  const chr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const chrLength = chr.length;
  for (let i = 0; i < n; i++) {
    result += chr.charAt(Math.floor(Math.random() * chrLength));
  }
  return result;
};

/**
 * generating embed vo
 * @param {Number} url - url's video
 * @return {String}
 */
const embedYtVideo = (url) => {
  if (!url.includes("youtu")) throw new Error("Only accept YouTube url");
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) return match[2];
  return "error";
};

/**
 * Convert string to lowercase
 * @param {String} str - String to convert
 * @return {String}
 */
const lower = (str) => {
  return str.toLowerCase();
};

/**
 * Convert CamelCaseString to kebab-case-string
 * @param {String} str - String to convert
 * @return {String}
 */
const toKebabCase = (str) => {
  if (isNil(str)) return null;
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

/**
 * Convert CamelCaseString to snake_case
 * @param {String} str - String to convert
 * @return {String}
 */
const toSnakeCase = (str) => {
  if (isNil(str)) return null;
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
};

/**
 * Convert number like '2' into '02'
 * @param {Number or String} int
 * @return {String}
 */
const addZero = (int) => {
  if (isNil(int)) throw new Error("Value can't be 'null' or 'undefined'");
  if (isNaN(int)) throw new Error("'addZero' only accept 'Int' or 'Number'");
  return int < 10 ? `0${int}` : `${int}`;
};

/**
 * First letter in uppercase
 * @param {String} str
 * @return {String}
 */
const capitalize = (str) => {
  if (isNil(str)) throw new Error("Value can't be 'null' or 'undefined'");
  if (typeof str !== "string" || !str instanceof String)
    throw new Error("Value need to be a string");
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Pluralize
 * @param {String} singular
 * @param {Number} count
 * @param {String|null} plural
 * @return {string}
 */
const pluralize = (singular, count = 1, plural = null) => {
  if (isNil(singular)) throw new Error("Value can't be 'null' or 'undefined'");
  if (typeof singular !== "string" || !singular instanceof String)
    throw new Error("Value need to be a string");
  if (isNil(plural)) return count > 1 ? `${singular}s` : singular;
  return count > 1 || count === 0 ? plural : singular;
};

module.exports = {
  isNil,
  isObj,
  isBlank,
  mergeObjIf,
  isEmpty,
  isValidDate,
  hasOwnProperty,
  objPick,
  only,
  isDigitsOnly,
  getChildrenN,
  getObjKeyName,
  omit,
  isEqual,
  deepCopy,
  convertStringToPropGetter,
  constructQueries,
  getObjectFromValue,
  groupByKey,
  removeDuplicates,
  arrIndexOf,
  makeKey,
  embedYtVideo,
  lower,
  toKebabCase,
  toSnakeCase,
  addZero,
  capitalize,
  pluralize,
};
