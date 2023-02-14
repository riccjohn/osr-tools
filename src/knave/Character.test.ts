import KnaveCharacter from './Character'

jest.mock('@/dice/Dice')
jest.mock('./Description')
jest.mock('./Gear')
jest.mock('@/dice/Randomization')

describe('KnaveCharacter', () => {
  let character: KnaveCharacter

  describe('initialization', () => {
    beforeEach(() => {
      character = new KnaveCharacter()
    })

    test('sets a default for all abilities', () => {
      const defaultAbility = { bonus: 3, defense: 13 }

      expect(character.charisma).toEqual(defaultAbility)
      expect(character.constitution).toEqual(defaultAbility)
      expect(character.dexterity).toEqual(defaultAbility)
      expect(character.intelligence).toEqual(defaultAbility)
      expect(character.strength).toEqual(defaultAbility)
      expect(character.wisdom).toEqual(defaultAbility)
    })

    test('sets a default for copper pieces', () => {
      expect(character.copperPieces).toEqual(0)
    })

    test('sets a default list of items', () => {
      const defaultItem = { name: '', count: 0, type: 'food', slots: 0 }
      expect(character.items).toHaveLength(1)
      expect(character.items[0]).toEqual(defaultItem)
    })

    test('sets a default level of 1', () => {
      expect(character.level).toBe(1)
    })

    test('sets a default max HP of 4', () => {
      expect(character.maxHp).toBe(4)
    })

    test('sets a default number of item slots', () => {
      expect(character.itemSlots).toEqual(13)
    })

    test('generates a list of traits', () => {
      const traitNouns = Object.keys(character.traits)
      expect(traitNouns.length).toBeGreaterThan(1)
    })
  })

  describe('generate()', () => {
    let generatedCharacter: KnaveCharacter

    beforeEach(() => {
      generatedCharacter = new KnaveCharacter()
      generatedCharacter.generate()
    })

    test('generates a level 1 character by default', () => {
      expect(generatedCharacter.level).toBe(1)
    })

    describe('abilities', () => {
      describe('charisma', () => {
        test('generates a random charisma', () => {
          expect(generatedCharacter.charisma.bonus).toBeLessThanOrEqual(6)
          expect(generatedCharacter.charisma.bonus).toBeGreaterThanOrEqual(1)
        })

        test('has a charisma defense that is 10 higher than the bonus', () => {
          expect(generatedCharacter.charisma.defense).toEqual(
            generatedCharacter.charisma.bonus + 10,
          )
        })
      })

      describe('constitution', () => {
        test('generates a random constitution', () => {
          expect(generatedCharacter.constitution.bonus).toBeLessThanOrEqual(6)
          expect(generatedCharacter.constitution.bonus).toBeGreaterThanOrEqual(
            1,
          )
        })

        test('has a constitution defense that is 10 higher than the bonus', () => {
          expect(generatedCharacter.constitution.defense).toEqual(
            generatedCharacter.constitution.bonus + 10,
          )
        })
      })

      describe('dexterity', () => {
        test('generates a random dexterity', () => {
          expect(generatedCharacter.dexterity.bonus).toBeLessThanOrEqual(6)
          expect(generatedCharacter.dexterity.bonus).toBeGreaterThanOrEqual(1)
        })

        test('has a dexterity defense that is 10 higher than the bonus', () => {
          expect(generatedCharacter.dexterity.defense).toEqual(
            generatedCharacter.dexterity.bonus + 10,
          )
        })
      })

      describe('intelligence', () => {
        test('generates a random intelligence', () => {
          expect(generatedCharacter.intelligence.bonus).toBeLessThanOrEqual(6)
          expect(generatedCharacter.intelligence.bonus).toBeGreaterThanOrEqual(
            1,
          )
        })

        test('has a intelligence defense that is 10 higher than the bonus', () => {
          expect(generatedCharacter.intelligence.defense).toEqual(
            generatedCharacter.intelligence.bonus + 10,
          )
        })
      })

      describe('strength', () => {
        test('generates a random strength', () => {
          expect(generatedCharacter.strength.bonus).toBeLessThanOrEqual(6)
          expect(generatedCharacter.strength.bonus).toBeGreaterThanOrEqual(1)
        })

        test('has a strength defense that is 10 higher than the bonus', () => {
          expect(generatedCharacter.strength.defense).toEqual(
            generatedCharacter.strength.bonus + 10,
          )
        })
      })

      describe('wisdom', () => {
        test('generates a random wisdom', () => {
          expect(generatedCharacter.wisdom.bonus).toBeLessThanOrEqual(6)
          expect(generatedCharacter.wisdom.bonus).toBeGreaterThanOrEqual(1)
        })

        test('has a wisdom defense that is 10 higher than the bonus', () => {
          expect(generatedCharacter.wisdom.defense).toEqual(
            generatedCharacter.wisdom.bonus + 10,
          )
        })
      })

      describe('abilityScores', () => {
        test('has a getter method to get all ability scores', () => {
          const abilities = generatedCharacter.abilityScores
          const abilityNames = Object.keys(abilities)
          expect(abilityNames.sort()).toEqual([
            'charisma',
            'constitution',
            'dexterity',
            'intelligence',
            'strength',
            'wisdom',
          ])
        })
      })
    })

    test('has a number of item slots equal to the constitution defense', () => {
      expect(generatedCharacter.itemSlots).toBe(
        generatedCharacter.constitution.defense,
      )
    })

    test('has a randomly generated starting copper pieces', () => {
      expect(generatedCharacter.copperPieces).toBeGreaterThanOrEqual(23)
      expect(generatedCharacter.copperPieces).toBeLessThanOrEqual(38)
    })

    test('has a maxHP stat between 1 and 8', () => {
      expect(generatedCharacter.maxHp).toBeGreaterThanOrEqual(1)
      expect(generatedCharacter.maxHp).toBeLessThanOrEqual(8)
    })

    test('generates a list of items', () => {
      expect(generatedCharacter.items.length).toBeGreaterThan(1)
    })

    test('randomly generates armor', () => {
      expect(generatedCharacter.armor).toBeTruthy()
    })

    test('randomly generates a weapon', () => {
      expect(generatedCharacter.weapon).toBeTruthy()
    })
  })
})
