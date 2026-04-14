import fs from 'node:fs'
import path from 'node:path'
import parse from './parsers.js'
import buildTree from './buildTree.js'
import format from './formatters/index.js'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFileFormat = filepath => path.extname(filepath)

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  const parsedData1 = parse(data1, getFileFormat(filepath1))
  const parsedData2 = parse(data2, getFileFormat(filepath2))

  const tree = buildTree(parsedData1, parsedData2)

  return format(tree, formatName)
}

export default genDiff
