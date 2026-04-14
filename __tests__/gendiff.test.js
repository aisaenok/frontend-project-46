import fs from 'node:fs'
import path from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@jest/globals'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

const expected = readFixture('expectedStylish.txt')

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
])('gendiff compares nested files: %s and %s', (file1, file2) => {
  const filepath1 = getFixturePath(file1)
  const filepath2 = getFixturePath(file2)

  expect(genDiff(filepath1, filepath2)).toEqual(expected)
})
