import fs from 'node:fs'
import path from 'node:path'
import parsers from './parsers.js'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFileFormat = filepath => path.extname(filepath)

const formatValue = value => String(value)

const getSortedKeys = (data1, data2) => (
  [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort()
)

const buildDiff = (data1, data2) => {
  const keys = getSortedKeys(data1, data2)

  const lines = keys.flatMap((key) => {
    const hasKey1 = Object.hasOwn(data1, key)
    const hasKey2 = Object.hasOwn(data2, key)

    if (hasKey1 && hasKey2 && data1[key] === data2[key]) {
      return `    ${key}: ${formatValue(data1[key])}`
    }

    if (hasKey1 && hasKey2) {
      return [
        `  - ${key}: ${formatValue(data1[key])}`,
        `  + ${key}: ${formatValue(data2[key])}`,
      ]
    }

    if (hasKey1) {
      return `  - ${key}: ${formatValue(data1[key])}`
    }

    return `  + ${key}: ${formatValue(data2[key])}`
  })

  return ['{', ...lines, '}'].join('\n')
}

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  const parsedData1 = parsers(data1, getFileFormat(filepath1))
  const parsedData2 = parsers(data2, getFileFormat(filepath2))

  return buildDiff(parsedData1, parsedData2)
}

export default genDiff
