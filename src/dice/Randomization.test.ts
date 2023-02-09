import { Randomization } from './'

describe('Randomization', () => {
  describe('getRandomItem()', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

    test('returns a single item from the given list', () => {
      const randomItem = Randomization.getRandomItem(list)
      expect(list.includes(randomItem)).toBeTruthy()
    })

    test('returns a random item from the given list', () => {
      const randomItems: string[] = new Array(10)
        .fill(undefined)
        .map(() => Randomization.getRandomItem(list))

      randomItems.forEach(item => {
        expect(list.includes(item)).toBeTruthy()
      })

      const uniqueItems = randomItems.reduce((acc: string[], curr: string) => {
        if (!acc.includes(curr)) {
          acc.push(curr)
        }
        return acc
      }, [])

      expect(uniqueItems.length).toBeGreaterThan(1)
    })
  })
})
