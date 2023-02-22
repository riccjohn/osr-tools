import ShadowdarkCharacter from './ShadowdarkCharacter'
import { names } from './data'

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

          test('generates modifiers for each ability score', () => {
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

            expect(
              abilities.some(ability => ability.modifier <= 0),
            ).toBeTruthy()
            expect(abilities.some(ability => ability.modifier > 0)).toBeTruthy()
          })
        })

        describe('race', () => {
          test('assigns a random race', () => {
            const character = new ShadowdarkCharacter()
            character.generate()

            expect(character.race).toBeTruthy()
          })

          test('assigns languages based on the race', () => {
            const characters = Array(75)
              .fill(undefined)
              .map(() => {
                const character = new ShadowdarkCharacter()
                character.generate()

                return character
              })

            const dwarfCharacters = characters.filter(
              character => character.race.name === 'Dwarf',
            )

            expect(
              dwarfCharacters.every(
                character =>
                  character.languages.includes('Dwarvish') &&
                  character.languages.includes('Common'),
              ),
            ).toBeTruthy()
          })

          describe('when the character is human', () => {
            test('assigns a second language randmoly', () => {
              const characters = Array(75)
                .fill(undefined)
                .map(() => {
                  const character = new ShadowdarkCharacter()
                  character.generate()

                  return character
                })

              const humanCharacters = characters.filter(
                character => character.race.name === 'Human',
              )

              expect(humanCharacters.every( character => character.languages.length === 2)).toBeTruthy()
            })
          })

          test('assigns a name based on the race', () => {
            const character = new ShadowdarkCharacter()
            character.generate()

            const characterRace = character.race.name.toLowerCase()
            const allNames: Record<string, string[]> = names

            expect(allNames[characterRace].includes(character.name)).toBeTruthy()
        })
          })
      })
    })
  })
})
