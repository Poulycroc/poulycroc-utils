/**
 * @author      PoulycrocStudio <poulycroc.studio@gmail.com>
 */
const utils = require("./utils");

// isNil
test("check if null return true", () => {
  expect(utils.isNil(null)).toBe(true);
});
test("check if undefined return true", () => {
  expect(utils.isNil(undefined)).toBe(true);
});

// isObj
test("check if object return true", () => {
  expect(utils.isObj({ name: "Joe" })).toBe(true);
});
test("check if array return false", () => {
  expect(utils.isObj(["Joe"])).toBe(false);
});
test("check if number return false", () => {
  expect(utils.isObj(1)).toBe(false);
});
test("check if string return false", () => {
  expect(utils.isObj("Joe")).toBe(false);
});
test("check if undefined return false", () => {
  expect(utils.isObj(undefined)).toBe(false);
});
test("check if null return false", () => {
  expect(utils.isObj(null)).toBe(false);
});

// objPick
test("check basic exemple return except", () => {
  const model = { fname: null, lname: null };
  const object = { fname: "xyz", lname: "abc", age: 23 };
  const expectResult = { fname: "xyz", lname: "abc" };
  expect(utils.objPick(model, object)).toStrictEqual(expectResult);
});
test("check with missing object return null", () => {
  const o = { fname: "xyz", lname: "abc", age: 23 };
  expect(utils.objPick(undefined, o)).toBe(null);
  expect(utils.objPick(o, undefined)).toBe(null);
  expect(utils.objPick(o, null)).toBe(null);
  expect(utils.objPick(null, o)).toBe(null);
});

// embedYtVideo
// test("check if not url youtube return error", () => {
//   const url = "facebook.com";
//   expect(utils.embedYtVideo(url)).toThrow("Only accept YouTube url");
// });

// removeDuplicates
test("check with all same value's type", () => {
  const arr = ["max", "joe", "joe", "ardyan"];
  const expectResult = ["max", "joe", "ardyan"];
  expect(utils.removeDuplicates(arr)).toStrictEqual(expectResult);
});
test("check with all same value's type but with different cases", () => {
  const arr = ["max", "Joe", "joe", "ardyan"];
  const expectResult = ["max", "Joe", "joe", "ardyan"];
  expect(utils.removeDuplicates(arr)).toStrictEqual(expectResult);
});
test("check with all different value's", () => {
  const arr = ["1", 2, "2", 3];
  const expectResult = ["1", 2, "2", 3];
  expect(utils.removeDuplicates(arr)).toStrictEqual(expectResult);
});
// test("check when it's not an array", () => {
//   const err = "Only accept 'Array'";
//   expect(utils.removeDuplicates("a")).toThrow(err);
//   expect(utils.removeDuplicates(1)).toThrow(err);
// });
// test("check when it's undifined or null", () => {
//   const err = "Can't work on undifined value";
//   expect(utils.removeDuplicates(null)).toThrow(err);
//   expect(utils.removeDuplicates(undefined)).toThrow(err);
// });

// makeKey
test("check key generate", () => {
  const l = utils.makeKey().length;
  expect(l).toBe(6);
});
test("check key generate", () => {
  const l = utils.makeKey(10).length;
  expect(l).toBe(10);
});

// isEmpty
test("chekc if Array is empty", () => {
  expect(utils.isEmpty([])).toBe(true);
});
test("chekc if Object is empty", () => {
  expect(utils.isEmpty({})).toBe(true);
});

// getChildrenN
test("check if element getted by 'n'", () => {
  const o = { fname: "xyz", lname: "abc", age: 23 };
  expect(utils.getChildrenN(o, 2)).toStrictEqual(23);
});

// toKebabCase
test("check toKbabCase convertion", () => {
  const str = "PageComponent";
  const res = "page-component";
  expect(utils.toKebabCase(str)).toStrictEqual(res);
});
test("check toKbabCase convertion with null or undefined", () => {
  expect(utils.toKebabCase(null)).toBe(null);
  expect(utils.toKebabCase(undefined)).toBe(null);
});

// addZero
test("check if add zero on first character", () => {
  expect(utils.addZero(2)).toStrictEqual("02");
  expect(utils.addZero("2")).toStrictEqual("02");
  expect(utils.addZero(12)).toStrictEqual("12");
  expect(utils.addZero("12")).toStrictEqual("12");
});
test("check if with null or defined value return null", () => {
  expect(utils.addZero(null)).toBe(null);
  expect(utils.addZero(undefined)).toBe(null);
});

// addZero
test("check if add zero on first character", () => {
  const str = "hey how are you ?";
  const res = "Hey how are you ?";
  expect(utils.capitalize(str)).toStrictEqual(res);
});
test("check if with null or defined value return null", () => {
  expect(utils.capitalize(null)).toBe(null);
  expect(utils.capitalize(undefined)).toBe(null);
});

// omit
test("check if add zero on first character", () => {
  const obj = { name: "Doe", firstname: "John", id: 23 };
  const newObj = { name: "Doe", firstname: "John" };
  expect(utils.omit(["id"], obj)).toStrictEqual(newObj);
});
test("check if value in omit are not excepted", () => {
  const o = { name: "Doe", firstname: "John", id: 23 };
  expect(utils.omit(1, o)).toStrictEqual(null);
  expect(utils.omit("1", o)).toStrictEqual(null);
  expect(utils.omit(["1"], "o")).toStrictEqual(null);
  expect(utils.omit(["1"], ["o"])).toStrictEqual(null);
});
test("check if with null or defined value return null", () => {
  expect(utils.omit(null)).toBe(null);
  expect(utils.omit(undefined)).toBe(null);
});

// isEqual
test("check if same array return true", () => {
  const a = ["id", "hey", "yo"];
  const b = ["id", "hey", "yo"];
  expect(utils.isEqual(a, b)).toBe(true);
});
test("check if not same array return true", () => {
  const a = ["id", "hey", "yo"];
  const b = ["uuid", "hey", "yo"];
  expect(utils.isEqual(a, b)).toBe(false);
});
test("check if same object return true", () => {
  const a = { fname: "xyz", lname: "abc", age: 23 };
  const b = { fname: "xyz", lname: "abc", age: 23 };
  expect(utils.isEqual(a, b)).toBe(true);
});
test("check if not same object return true", () => {
  const a = { fname: "xyz", lname: "abc", age: 23 };
  const b = { fname: "azr", lname: "aaa", age: 23 };
  expect(utils.isEqual(a, b)).toBe(false);
});
