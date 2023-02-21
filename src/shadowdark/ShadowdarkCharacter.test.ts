import ShadowdarkCharacter from './ShadowdarkCharacter'
import { Dice } from '@/dice'

describe('ShadowdarkCharacter', () => {
  describe('initialization', () => {
    describe('given no arguments', () => {
      test('sets a default for each ability', () => {
        const character = new ShadowdarkCharacter()
        const defaultAbility = { score: 10, modifier: 0 }

        expect(character.strength).toEqual(defaultAbility)
        expect(character.dexterity).toEqual(defaultAbility)
        expect(character.constitution).toEqual(defaultAbility)
        expect(character.intelligence).toEqual(defaultAbility)
        expect(character.wisdom).toEqual(defaultAbility)
        expect(character.charisma).toEqual(defaultAbility)
      })

      describe('generate()', () => {
        describe('abilities', () => {
          test('generates new ability scores randomly', () => {
            const characterOne = new ShadowdarkCharacter()
            characterOne.generate()

            const characterTwo = new ShadowdarkCharacter()
            characterTwo.generate()

            expect(characterOne.abilityScores).not.toEqual(
              characterTwo.abilityScores,
            )
          })

          test('ability scores include at least one number 14 or above', () => {
            const characters = Array(75)
              .fill(undefined)
              .map(() => {
                const character = new ShadowdarkCharacter()
                character.generate()

                return character
              })

            const characterHasValidAbilityScores: boolean[] = characters.map(
              character => {
                const abilities = Object.keys(character.abilityScores).map(
                  abilityName =>
                    character.abilityScores[
                      abilityName as IShadowdarkAbilityName
                    ],
                )

                return abilities.some(ability => ability.score >= 14)
              },
            )

            expect(
              characterHasValidAbilityScores.every(
                character => character === true,
              ),
            ).toBeTruthy()
          })

          test('generates an ability score between 3 and 18 for each ability', () => {
            const character = new ShadowdarkCharacter()
            character.generate()

            const abilities = Object.keys(character.abilityScores).map(
              abilityName =>
                character.abilityScores[abilityName as IAbilityName],
            ) 

            const abilityScoreValues = abilities.map(ability => ability.score)
            expect(abilityScoreValues.every(score => score === 10)).toBeFalsy()

            abilities.forEach(ability => {
              expect(ability.score).toBeGreaterThanOrEqual(3)
              expect(ability.score).toBeLessThanOrEqual(18)
            })
          })

          test('generates the correct modifier for each ability score', () => {
            jest.spyOn(Dice, 'roll').mockImplementation(() => 14)
            const character = new ShadowdarkCharacter()
            character.generate()

            const abilities = [
              character.strength,
              character.dexterity,
              character.constitution,
              character.intelligence,
              character.wisdom,
              character.charisma,
            ]

            expect(abilities.every( ability => ability.modifier === 2)).toBeTruthy()
          })
        })
      })
    })
  })
})
