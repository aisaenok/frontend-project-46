import { isPlainObject } from '../utils.js'

const formatValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return String(value)
}

const buildPlain = (tree, ancestry = []) => {
  const lines = tree.flatMap((node) => {
    const propertyPath = [...ancestry, node.key].join('.')

    switch (node.type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`

      case 'removed':
        return `Property '${propertyPath}' was removed`

      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`

      case 'nested':
        return buildPlain(node.children, [...ancestry, node.key])

      case 'unchanged':
        return []

      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return lines
}

const plain = tree => buildPlain(tree).join('\n')

export default plain
