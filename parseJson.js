const pluralize = require('pluralize')

const typeOf = (term) => {
  let type = typeof term
  if (type === 'object') {
    type = Array.isArray(term) ? 'array' : 'object'
  }
  return type
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const fieldToClassName = (string) => {
  return string
    .split('_')
    .map(capitalize)
    .join("")
}

const intOrFloat = (number) => {
  const isFractional = number.toString().split('.').length === 2
  return isFractional ? 'Float' : 'Int'
}

const generateOutput = (name, input) => {
  const json = JSON.parse(input)

  const declarations = []
  const type = parseJson(name, json, declarations)

  declarations.push(`val ${name}: ${type}`)
  return declarations.join('\n')
}

const parseJson = (key, value, classes) => {
  const type = typeOf(value)
  switch (type) {
    case 'object': return parseObject(key, value, classes)
    case 'array': return parseArray(key, value, classes)
    case 'string': return parseString(key, value)
    case 'number': return parseNumber(key, value)
    case 'boolean': return parseBoolean(key, value)
    default: throw Error(`Unrecognized term ${key}: ${value}`)
  }
}

const parseObject = (key, value, classes) => {
  const name = fieldToClassName(key)
  const fields = []
  for (const [k, v] of Object.entries(value)) {
    const fieldType = parseJson(k, v, classes)
    const field = `val ${k}: ${fieldType}`
    fields.push(field)
  }

  const _class = `data class ${name}(` + fields.join(', ') + ')'
  classes.push(_class)
  return name
}

const parseArray = (key, value, classes) => {
  const name = pluralize.isSingular(key) ? `${key}Record` : pluralize.singular(key)
  return `Array<${parseJson(name, value[0], classes)}>`
}

const parseString = (key, value) => {
  return 'String'
}

const parseNumber = (key, value) => {
  return intOrFloat(value)
}

const parseBoolean = (key, value) => {
  return 'Boolean'
}

module.exports = {
  typeOf,
  capitalize,
  fieldToClassName,
  generateOutput,
  parseObject,
  parseArray,
  parseString,
  parseNumber,
  parseBoolean
}