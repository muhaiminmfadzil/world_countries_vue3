/**
 * Filter the object based on allowed properties
 *
 * @param obj - Object to be filtered
 * @param allowedProperties - Properties to allow in array of string
 * @returns filtered object
 */
export const filterAllowedObjectProperties = (
  obj: { [key: string]: any },
  allowedProperties: String[] = []
) => {
  return Object.keys(obj).reduce((next, key) => {
    if (allowedProperties.includes(key)) {
      const result = { ...next, [key]: obj[key] }
      return result
    } else {
      return next
    }
  }, {})
}

/**
 *
 * @param word
 * @param query
 * @returns
 */
export const stringHighlighter = (word: string, query: string) => {
  const check = new RegExp(query, 'ig')
  return word.toString().replace(check, function (matchedText) {
    return '<span class="highlight">' + matchedText + '</span>'
  })
}
