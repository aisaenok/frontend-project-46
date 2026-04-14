import { isPlainObject } from '../utils.js'

const INDENT_SIZE = 4
const LEFT_SHIFT = 2

const getIndent = (depth, shift = 0) => ' '.repeat(depth * INDENT_SIZE - shift)

const formatValue = (value, depth) => {
  if (!isPlainObject(value)) {
    return String(value)
  }

  const entries = Object.entries(value)

  const lines = entries.map(([key, nestedValue]) => (
    `${getIndent(depth + 1)}${key}: ${formatValue(nestedValue, depth + 1)}`
  ))

  return [
    '{',
    ...lines,
    `${getIndent(depth)}}`,
  ].join('\n')
}

const formatNode = (node, depth) => {
  const signIndent = getIndent(depth, LEFT_SHIFT)
  const plainIndent = getIndent(depth)

  switch (node.type) {
    case 'added':
      return `${signIndent}+ ${node.key}: ${formatValue(node.value, depth)}`
    case 'removed':
      return `${signIndent}- ${node.key}: ${formatValue(node.value, depth)}`
    case 'unchanged':
      return `${plainIndent}${node.key}: ${formatValue(node.value, depth)}`
    case 'changed':
      return [
        `${signIndent}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
        `${signIndent}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
      ].join('\n')
    case 'nested':
      return [
        `${plainIndent}${node.key}: {`,
        formatStylish(node.children, depth + 1),
        `${plainIndent}}`,
      ].join('\n')
    default:
      throw new Error(`Unknown node type: ${node.type}`)
  }
}

const formatStylish = (tree, depth = 1) => tree
  .map(node => formatNode(node, depth))
  .join('\n')

const stylish = tree => [
  '{',
  formatStylish(tree),
  '}',
].join('\n')

export default stylish
