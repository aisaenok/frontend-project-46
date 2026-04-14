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

const expectedStylish = readFixture('expectedStylish.txt')
const expectedPlain = readFixture('expectedPlain.txt')

test.each([
  ['file1.json', 'file2.json', 'stylish', expectedStylish],
  ['file1.yml', 'file2.yml', 'stylish', expectedStylish],
  ['file1.json', 'file2.json', 'plain', expectedPlain],
  ['file1.yml', 'file2.yml', 'plain', expectedPlain],
])('gendiff compares %s and %s in %s format', (file1, file2, formatName, expected) => {
  const filepath1 = getFixturePath(file1)
  const filepath2 = getFixturePath(file2)

  expect(genDiff(filepath1, filepath2, formatName)).toEqual(expected)
})
