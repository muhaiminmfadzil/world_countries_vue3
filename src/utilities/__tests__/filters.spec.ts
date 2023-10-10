import { describe, it, expect } from 'vitest'
import { filterAllowedObjectProperties } from '@/utilities/filters'

describe('Filter alllowed object properties', () => {
  const dataObject = {
    name: 'Abang Tesla',
    age: 25,
    married: true,
    wife: ['Isteri pertama', 'Isteri kedua']
  }

  it('filter allowed properties in normal case', () => {
    const allowedProperties = ['name', 'age']
    const expectedResult = {
      name: dataObject.name,
      age: dataObject.age
    }
    expect(filterAllowedObjectProperties(dataObject, allowedProperties)).toStrictEqual(
      expectedResult
    )

    const allowedProperties2 = ['name', 'wife', 'married']
    const expectedResult2 = {
      name: dataObject.name,
      married: dataObject.married,
      wife: dataObject.wife
    }
    expect(filterAllowedObjectProperties(dataObject, allowedProperties2)).toStrictEqual(
      expectedResult2
    )

    const allowedProperties3 = ['married']
    const expectedResult3 = {
      married: dataObject.married
    }
    expect(filterAllowedObjectProperties(dataObject, allowedProperties3)).toStrictEqual(
      expectedResult3
    )
  })

  it('filter allowed properties and neglect non-existed properties', () => {
    const allowedProperties = ['name', 'non-exist']
    const expectedResult = {
      name: dataObject.name
    }
    expect(filterAllowedObjectProperties(dataObject, allowedProperties)).toStrictEqual(
      expectedResult
    )

    const allowedProperties2 = ['non-exist']
    const expectedResult2 = {}
    expect(filterAllowedObjectProperties(dataObject, allowedProperties2)).toStrictEqual(
      expectedResult2
    )
  })
})
