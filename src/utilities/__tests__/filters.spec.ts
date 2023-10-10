import { describe, it, expect } from 'vitest'
import { filterAllowedObjectProperties, stringHighlighter } from '@/utilities/filters'

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

describe('String highlighter', () => {
  it('filter and create span properly', () => {
    const span = (value: string) => {
      return `<span class="highlight">${value}</span>`
    }
    const word = 'I am the Future Leader of the WORLD!'

    const testData = [
      {
        query: '',
        result: word
      },
      {
        query: 'the',
        result: `I am ${span('the')} Future Leader of ${span('the')} WORLD!`
      },
      {
        query: 'i',
        result: `${span('I')} am the Future Leader of the WORLD!`
      },
      {
        query: 'futURE leader',
        result: `I am the ${span('Future Leader')} of the WORLD!`
      },
      {
        query: 'World',
        result: `I am the Future Leader of the ${span('WORLD')}!`
      }
    ]

    testData.forEach((test) => {
      expect(stringHighlighter(word, test.query)).toBe(test.result)
    })
  })
})
