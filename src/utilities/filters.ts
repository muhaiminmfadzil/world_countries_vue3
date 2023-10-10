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
 * Filter word and return word with span highlighted if query found in the word
 *
 * @param word - word to check for highlight
 * @param query - search query
 * @returns string with <span class="highlight"> if query found in the word
 */
export const stringHighlighter = (word: string, query: string) => {
  // If no query, return word itself
  if (query.length === 0) return word

  const check = new RegExp(query, 'ig')
  return word.toString().replace(check, function (matchedText) {
    return '<span class="highlight">' + matchedText + '</span>'
  })
}
