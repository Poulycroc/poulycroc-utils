export const isNil=e=>null==e;export const isObj=e=>{if(!isNil(e))return"object"==typeof e};export const objPick=(e,t)=>{const r={};return Object.keys(e).forEach(e=>r[e]=t[e]),r};export const embedYtVideo=e=>{const t=e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);return t&&11===t[2].length?t[2]:"error"};export const makeKey=e=>{const t=void 0===e?6:e;let r="";const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=o.length;for(let e=0;e<t;e++)r+=o.charAt(Math.floor(Math.random()*s));return r};export const lower=e=>e.toLowerCase();export const getChildrenN=(e,t)=>{if(isNil(e)&&!isObj(e))return;if(isNil(t))return;return e[Object.keys(e)[t]]};export const toKebabCase=e=>{if(!isNil(e))return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/\s+/g,"-").toLowerCase()};export const getObjKeyName=e=>{if(!isNil(e)||isObj(e))return Object.keys(e)[0]};export const addZero=e=>e<10?`0${e}`:e;export const capitalize=e=>{if(!isNil(e))return e.charAt(0).toUpperCase()+e.slice(1)};export const isTeacher=({type:e})=>"Teacher"===e;export const userLink=e=>{if(isNil(e))return;return(isTeacher(e)?"/profs/":"/users/")+e.id};