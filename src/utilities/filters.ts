/**
 * Filter the object based on allowed properties
 *
 * @param obj - Object to be filtered
 * @param allowedProperties - Properties to allow in array of string
 * @returns filtered object
 */
export function filterAllowedObjectProperties(
  obj: { [key: string]: any },
  allowedProperties: String[] = []
) {
  return Object.keys(obj).reduce((next, key) => {
    if (allowedProperties.includes(key)) {
      const result = { ...next, [key]: obj[key] }
      return result
    } else {
      return next
    }
  }, {})
}
