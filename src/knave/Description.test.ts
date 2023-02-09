import Description from './Description'
import traitsData from './data/traits.json'

jest.mock('@/dice/Randomization')

describe('Description', () => {
  describe('traits', () => {
    const nouns = Object.keys(traitsData)

    const description = new Description()
    const traits: ITraits = description.traits

    nouns.forEach(noun => {
      test(`generates a ${noun} trait`, () => {
        const possibleTraits = traitsData[noun as INoun]
        expect(possibleTraits.includes(traits[noun as INoun])).toBeTruthy()
      })
    })
  })
})
