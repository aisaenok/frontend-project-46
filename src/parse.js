const parse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data)
    default:
      throw new Error(`Unknown file format: ${format}`)
  }
}

export default parse
