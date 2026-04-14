import { isPlainObject } from './utils.js'

const getSortedKeys = (obj1, obj2) => (
  [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]
    .sort((a, b) => a.localeCompare(b))
)

const buildTree = (obj1, obj2) => {
  const keys = getSortedKeys(obj1, obj2)

  return keys.map((key) => {
    const hasKey1 = Object.hasOwn(obj1, key)
    const hasKey2 = Object.hasOwn(obj2, key)

    if (!hasKey1) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      }
    }

    if (!hasKey2) {
      return {
        key,
        type: 'removed',
        value: obj1[key],
      }
    }

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (isPlainObject(value1) && isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      }
    }

    if (value1 === value2) {
      return {
        key,
        type: 'unchanged',
        value: value1,
      }
    }

    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    }
  })
}

export default buildTree
