import expandObjectKeys from "./expandObjectKeys";

describe('expandObjectKeys', () => {


  test('expands comma-separated string keys into individual keys', () => {
    const data = {
      "one, two, three": 23,
      "4, 5": "foo", 
    }

    const expectedOutput = {
      "one": 23,
      "two": 23,
      "three": 23,
      "4": "foo",
      "5": "foo",
    }

    expect(expandObjectKeys(data)).toStrictEqual(expectedOutput)
  })

  test('expands comma-separated keys without spaces', () => {
    const data = {
      "one,two,three": 23,
      "4,5": "foo", 
    }

    const expectedOutput = {
      "one": 23,
      "two": 23,
      "three": 23,
      "4": "foo",
      "5": "foo",
    }

    expect(expandObjectKeys(data)).toStrictEqual(expectedOutput)
  })
})