import fs from 'node:fs'
import path from 'node:path'
import parse from './parse.js'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFileFormat = filepath => path.extname(filepath)

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  const parsedData1 = parse(data1, getFileFormat(filepath1))
  const parsedData2 = parse(data2, getFileFormat(filepath2))

  return JSON.stringify({ parsedData1, parsedData2 }, null, 2)
}

export default genDiff
