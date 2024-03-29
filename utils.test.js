/**
 * @author      PoulycrocStudio <poulycroc.studio@gmail.com>
 */
const utils = require("./utils");

// isNil
describe("isNil testing", () => {
  test("check if null return true", () => {
    expect(utils.isNil(null)).toBe(true);
  });
  test("check if undefined return true", () => {
    expect(utils.isNil(undefined)).toBe(true);
  });
});

// isObj
describe("isObj testing", () => {
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
});

// objPick
describe("objPick testing", () => {
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
});

// embedYtVideo
describe("embedYtVideo testing", () => {
  test("check if not url youtube return error", () => {
    const url = "facebook.com";
    const callEmbedYtVideo = () => utils.embedYtVideo(url);
    expect(callEmbedYtVideo).toThrowError("Only accept YouTube url");
  });
});

// removeDuplicates
describe("removeDuplicates testing", () => {
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
  test("check when it's not an array", () => {
    const err = "Only accept 'Array'";
    const callRemoveDuplicates = () => utils.removeDuplicates("a");
    expect(callRemoveDuplicates).toThrowError(err);
  });
  test("check when it's not an array", () => {
    const err = "Only accept 'Array'";
    const callRemoveDuplicates = () => utils.removeDuplicates(1);
    expect(callRemoveDuplicates).toThrowError(err);
  });
  test("check when it's undifined or null", () => {
    const err = "Can't work on undifined value";
    const callRemoveDuplicates = () => utils.removeDuplicates(null);
    expect(callRemoveDuplicates).toThrowError(err);
  });
  test("check when it's undifined or null", () => {
    const err = "Can't work on undifined value";
    const callRemoveDuplicates = () => utils.removeDuplicates(undefined);
    expect(callRemoveDuplicates).toThrowError(err);
  });
});

// makeKey
describe("makeKey testing", () => {
  test("check key generate", () => {
    const l = utils.makeKey().length;
    expect(l).toBe(6);
  });
  test("check key generate", () => {
    const l = utils.makeKey(10).length;
    expect(l).toBe(10);
  });
});

// isEmpty
describe("isEmpty testing", () => {
  test("chekc if Array is empty", () => {
    expect(utils.isEmpty([])).toBe(true);
  });
  test("chekc if Object is empty", () => {
    expect(utils.isEmpty({})).toBe(true);
  });
});

// getChildrenN
describe("getChildrenN testing", () => {
  test("check if element getted by 'n'", () => {
    const o = { fname: "xyz", lname: "abc", age: 23 };
    expect(utils.getChildrenN(o, 2)).toStrictEqual(23);
  });
});

// toKebabCase
describe("toKebabCase testing", () => {
  test("check toKbabCase convertion", () => {
    const str = "PageComponent";
    const res = "page-component";
    expect(utils.toKebabCase(str)).toStrictEqual(res);
  });
  test("check toKbabCase convertion with null or undefined", () => {
    expect(utils.toKebabCase(null)).toBe(null);
    expect(utils.toKebabCase(undefined)).toBe(null);
  });
});

// toSnakeCase
describe("toSnakeCase testing", () => {
  test("check toSnakeCase convertion", () => {
    const str = "PageComponent";
    const res = "page_component";
    expect(utils.toSnakeCase(str)).toStrictEqual(res);
  });
  test("check toSnakeCase convertion with null or undefined", () => {
    expect(utils.toSnakeCase(null)).toBe(null);
    expect(utils.toSnakeCase(undefined)).toBe(null);
  });
});

// addZero
describe("addZero testing", () => {
  test("check if add zero on first character", () => {
    expect(utils.addZero(2)).toStrictEqual("02");
    expect(utils.addZero("2")).toStrictEqual("02");
    expect(utils.addZero(12)).toStrictEqual("12");
    expect(utils.addZero("12")).toStrictEqual("12");
  });
  test("check if with null or defined value return null", () => {
    const err = "Value can't be 'null' or 'undefined'";
    const callAddZero_null = () => utils.addZero(null);
    const callAddZero_undefined = () => utils.addZero(undefined);
    expect(callAddZero_null).toThrowError(err);
    expect(callAddZero_undefined).toThrowError(err);
  });
  test("Check if NaN element throw error", () => {
    const err = "'addZero' only accept 'Int' or 'Number'";
    const callAddZero_NaN = () => utils.addZero("NaN");
    expect(callAddZero_NaN).toThrowError(err);
  });
});

// capitalize
describe("capitalize testing", () => {
  test("check if capitalize correctly", () => {
    const str = "hey how are you ?";
    const res = "Hey how are you ?";
    expect(utils.capitalize(str)).toStrictEqual(res);
  });
  test("check value not a string", () => {
    const err = "Value need to be a string";
    const callCapitalize = () => utils.capitalize(1);
    expect(callCapitalize).toThrowError(err);
  });
  test("check if with null or defined value return null", () => {
    const err = "Value can't be 'null' or 'undefined'";
    const callCapitalize_null = () => utils.capitalize(null);
    const callCapitalize_undefined = () => utils.capitalize(undefined);
    expect(callCapitalize_null).toThrowError(err);
    expect(callCapitalize_undefined).toThrowError(err);
  });
});

// pluralize
describe("pluralize testing", () => {
  test("check if capitalize correctly: 'company'", () => {
    const singular = "company";
    const count = 2;
    const plural = "companies";
    const res = "companies";
    expect(utils.pluralize(singular, count, plural)).toStrictEqual(res);
  });
  test("check if capitalize correctly: 'campaign'", () => {
    const singular = "campaign";
    const count = 2;
    const plural = null;
    const res = "campaigns";
    expect(utils.pluralize(singular, count, plural)).toStrictEqual(res);
  });
  test("check if with null or defined value return null", () => {
    const err = "Value can't be 'null' or 'undefined'";
    const callCapitalize_null = () => utils.capitalize(null);
    const callCapitalize_undefined = () => utils.capitalize(undefined);
    expect(callCapitalize_null).toThrowError(err);
    expect(callCapitalize_undefined).toThrowError(err);
  });
});

// omit
describe("omit testing", () => {
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
});

// isEqual
describe("isEqual testing", () => {
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
});

// only
describe("only testing", () => {
  const obj = { name: "Doe", firstname: "John", id: 23 };
  test("check if add zero on first character", () => {
    const newObj = { name: "Doe" };
    expect(utils.only(["name"], obj)).toStrictEqual(newObj);
  });
  test("check if value in only are not excepted", () => {
    const firstNeedToByArray = "First param need to be an Array";
    const secondNeedToByObj = "Second param need to be an Object";

    const first_is_nbr = () => utils.only(1, obj);
    expect(first_is_nbr).toThrowError(firstNeedToByArray);

    const first_is_str = () => utils.only("1", obj);
    expect(first_is_str).toThrowError(firstNeedToByArray);

    const second_is_str = () => utils.only(["1"], "o");
    expect(second_is_str).toThrowError(secondNeedToByObj);

    const second_is_arr = () => utils.only(["1"], ["o"]);
    expect(second_is_arr).toThrowError(secondNeedToByObj);
  });
  test("check if with null or defined value return null", () => {
    const err = "'keys' or 'obj' can't be 'null' or 'undefined'";
    
    const first_is_null = () => utils.only(null, obj);
    expect(first_is_null).toThrowError(err);

    const first_is_undefined = () => utils.only(undefined, obj);
    expect(first_is_undefined).toThrowError(err);
  });
});

// only
describe("getObjectFromValue testing", () => {
  test("check if add zero on first character", () => {
    const arrs = [
      { name: "Doe", firstname: "John", id: 23 },
      { name: "Skywalker", firstname: "Luck", id: 12 },
      { name: "Skywalker", firstname: "Anakin", id: 34 },
      { name: "Nolastname", firstname: "Dewey", id: 21 },
    ];
    const res = { name: "Skywalker", firstname: "Anakin", id: 34 };
    expect(utils.getObjectFromValue(arrs, "id", 34)).toStrictEqual(res);
  });
});

// isDigitsOnly
describe("isDigitsOnly testing", () => {
  test("check if '123' return true", () => {
    expect(utils.isDigitsOnly("123")).toBe(true);
  });
  test("check if all others return false", () => {
    expect(utils.isDigitsOnly("+123")).toBe(false);
    expect(utils.isDigitsOnly("-123")).toBe(false);
    expect(utils.isDigitsOnly("123.")).toBe(false);
    expect(utils.isDigitsOnly(".123")).toBe(false);
    expect(utils.isDigitsOnly("123.0")).toBe(false);
    expect(utils.isDigitsOnly("0.123")).toBe(false);
    expect(utils.isDigitsOnly("Hello, world!")).toBe(false);
  });
});
