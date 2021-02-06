const {
  typeOf,
  capitalize,
  parseBoolean,
  parseNumber,
  parseObject,
  parseArray,
  parseString,
  fieldToClassName
} = require('./parseJson.js')

describe('typeOf', () => {
  test('distinguishes between arrays and objects', () => {
    const array = []
    const obj = {}

    const arrayType = typeOf(array)
    const objType = typeOf(obj)

    expect(arrayType).toBe('array')
    expect(objType).toBe('object')
  })
})

describe('captialize', () => {
  test('it should not change capitalized strings', () => {
    const alreadyCapitalizedString = 'Abcd'

    const capitalizedResult = capitalize(alreadyCapitalizedString)

    expect(capitalizedResult).toBe(alreadyCapitalizedString)
  })

  test('it should capitalize strings', () => {
    const lowercaseString = 'abcd'

    const capitalizedResult = capitalize(lowercaseString)

    expect(capitalizedResult).toBe('Abcd')
  })

  test('it should do knothing with an empty string', () => {
    const emptyString = ''

    const capitalizedResult = capitalize(emptyString)

    expect(capitalizedResult).toBe(emptyString)
  })
})

describe('fieldToClassname', () => {
  test('it should generatescorrect class names', () => {
    const fieldName1 = 'user_id'
    const fieldName2 = 'abc_def_ghi'
    const fieldName3 = 'abcd'

    const className1 = fieldToClassName(fieldName1)
    const className2 = fieldToClassName(fieldName2)
    const className3 = fieldToClassName(fieldName3)

    expect(className1).toBe('UserId')
    expect(className2).toBe('AbcDefGhi')
    expect(className3).toBe('Abcd')
  })
})

describe('parseBoolean', () => {
  test('it should return a correctly formatted Boolean', () => {
    const key = 'test'
    const value = true

    const result = parseBoolean(key, value)

    const expectedValue = 'Boolean'

    expect(result).toBe(expectedValue)
  })
})

describe('parseNumber', () => {
  test('it should return a correctly formatted Float', () => {
    const key = 'test'
    const value = 3.14

    const result = parseNumber(key, value)

    const expectedValue = 'Float'

    expect(result).toBe(expectedValue)
  })

  test('it should return a correctly formatted Int', () => {
    const key = 'test'
    const value = 3

    const result = parseNumber(key, value)

    const expectedValue = 'Int'

    expect(result).toBe(expectedValue)
  })
})

describe('parseString', () => {
  test('it should return a correctly formatted String', () => {
    const key = 'hello'
    const value = 'world'

    const result = parseString(key, value)

    const expectedValue = 'String'

    expect(result).toBe(expectedValue)
  })
})


describe('parseArray', () => {
  test('it should handle value elements', () => {
    const key = 'test'
    const classes = []
    const floatArray = [3.14]
    const intArray = [4]
    const stringArray = [""]

    const floatArrayType = parseArray(key, floatArray, classes)
    const intArrayType = parseArray(key, intArray)
    const stringArrayType = parseArray(key, stringArray, classes)

    expect(floatArrayType).toBe('Array<Float>')
    expect(stringArrayType).toBe('Array<String>')
    expect(intArrayType).toBe('Array<Int>')
  })

  test('it should handle Arrays of Arrays', () => {
    const key = 'test'
    const classes = []
    const arrayDepth2 = [[""]]
    const arrayDepth3 = [[[""]]]

    const arrayDepth2Type = parseArray(key, arrayDepth2, classes)
    const arrayDepth3Type = parseArray(key, arrayDepth3, classes)

    expect(arrayDepth2Type).toBe('Array<Array<String>>')
    expect(arrayDepth3Type).toBe('Array<Array<Array<String>>>')
  })

  test('it should handle object elements', () => {
    const key = 'indentities'
    const classes = []
    const objArray = [{ name: 'bob', 'id': 2 }]

    const objArrayType = parseArray(key, objArray, classes)

    expect(objArrayType).toBe('Array<Indentity>')
    expect(classes.length).toBe(1)
  })
})

describe('parseObject', () => {
  test('it should generate the correct type and sub classes', () => {
    const key = 'response'
    const value = { hello: 'World', array: [""], obj: {}, test: true}
    const classes = []

    const type = parseObject(key, value, classes)
    const expectedValueClass = 'data class Response(val hello: String, val array: Array<String>, val obj: Obj, val test: Boolean)'
    const expectedObjClass = 'data class Obj()'

    expect(type).toBe('Response')
    expect(classes.length).toBe(2)
    expect(classes.includes(expectedValueClass)).toBe(true)
    expect(classes.includes(expectedObjClass)).toBe(true)
  })
})