/**
 * @author      PoulycrocStudio <poulycroc.studio@gmail.com>
 */

/**
 * Check if element is null or undefined
 * @param {*} any - String to convert
 * @return {Boolean}
 */
export const isNil = (any) => {
  return any === undefined || any === null
}

/**
 * Check if element is an object
 * @param {*} any - String to convert
 * @return {Boolean}
 */
export const isObj = (any) => {
  if (isNil(any)) return
  return typeof any === 'object'
}

/**
 * Select only element from model object
 * @param {Object} model - ex: { fname:null, lname:null }
 * @param {Object} object - ex: { fname:"xyz", lname:"abc", age:23 }
 * @return {Object} - ex: { fname:"xyz", lname:"abc" }
 */
export const objPick = (model, object) => {
  const res = {}
  Object.keys(model).forEach((key) => (res[key] = object[key]))
  return res
}

/**
 * generating embed vo
 * @param {Number} url - url's video
 * @return {String}
 */
export const embedYtVideo = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)

  if (match && match[2].length === 11) {
    return match[2]
  } else {
    return 'error'
  }
}

/**
 * generate a random string
 * @param {Number} length - length of random string
 * @return {String}
 */
export const makeKey = (length) => {
  const n = length === undefined ? 6 : length
  let result = ''
  const chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const chrLength = chr.length
  for (let i = 0; i < n; i++) {
    result += chr.charAt(Math.floor(Math.random() * chrLength))
  }
  return result
}

/**
 * Convert string to lowercase
 * @param {String} str - String to convert
 * @return {String}
 */
export const lower = (str) => {
  return str.toLowerCase()
}

/**
 * get Children's object by position
 * @param {Object} obj - Object to pars
 * @param {Number} numb - Children position we want
 * @return {Object}
 */
export const getChildrenN = (obj, numb) => {
  if (isNil(obj) && !isObj(obj)) return
  if (isNil(numb)) return
  const keys = Object.keys(obj)
  const key = keys[numb]
  return obj[key]
}

/**
 * Convert CamelCaseString to kebab-case-string
 * @param {String} str - String to convert
 * @return {String}
 */
export const toKebabCase = (str) => {
  if (isNil(str)) return
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

/**
 * @param {Object} obj - String to convert
 * @return {String}
 */
export const getObjKeyName = (obj) => {
  if (isNil(obj) && !isObj(obj)) return
  return Object.keys(obj)[0]
}

/**
 * Convert number like '2' into '02'
 * @param {Number or String} int
 * @return {String}
 */
export const addZero = (int) => {
  return int < 10 ? `0${int}` : int
}

/**
 * First letter in uppercase
 * @param {String} str
 * @return {String}
 */
export const capitalize = (str) => {
  if (isNil(str)) return
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Check if user is a teacher
 * @param {Object} user
 * @return {Boolean}
 */
export const isTeacher = ({ type }) => {
  return type === 'Teacher'
}

/**
 * Construct user link
 * @param {Object} user
 * @return {String}
 */
export const userLink = (user) => {
  if (isNil(user)) return
  const base = isTeacher(user) ? '/profs/' : '/users/'
  return base + user.id
}
