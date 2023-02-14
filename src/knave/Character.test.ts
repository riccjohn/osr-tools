import KnaveCharacter from './Character'

jest.mock('@/dice/Dice')
jest.mock('./Description')
jest.mock('./Gear')
jest.mock('@/dice/Randomization')

describe('KnaveCharacter', () => {
  let character: KnaveCharacter

  describe('initialization', () => {
    describe('given no arguments', () => {
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

    describe('given character data as an argument', () => {
      beforeEach(() => {
        character = new KnaveCharacter(knaveCharacterJson)
      })

      test('uses the values from the given json to create a new character', () => {
        expect(character.armor).toEqual(knaveCharacterJson.armor)
        expect(character.copperPieces).toEqual(knaveCharacterJson.copperPieces)
        expect(character.items).toEqual(knaveCharacterJson.items)
        expect(character.itemSlots).toEqual(knaveCharacterJson.itemSlots)
        expect(character.level).toEqual(knaveCharacterJson.level)
        expect(character.maxHp).toEqual(knaveCharacterJson.maxHp)
        expect(character.traits).toEqual(knaveCharacterJson.traits)
        expect(character.weapon).toEqual(knaveCharacterJson.weapon)
        expect(character.abilityScores).toEqual(knaveCharacterJson.abilities)
      })
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

const knaveCharacterJson = {
	"armor": {
		"name": "helmet",
		"count": 1,
		"defense": 1,
		"slots": 1,
		"type": "armor",
		"quality": 1
	},
	"copperPieces": 31,
	"items": [
		{ "name": "rations", "count": 1, "slots": 1, "type": "food" },
		{ "name": "rations", "count": 1, "slots": 1, "type": "food" },
		{ "name": "candles", "slots": 1, "type": "light", "count": 5 },
		{ "name": "candles", "slots": 1, "type": "light", "count": 5 },
		{ "name": "grease", "slots": 1, "type": "tool", "count": 1 },
		{ "name": "incense", "slots": 1, "type": "tool", "count": 1 },
		{
			"name": "helmet",
			"count": 1,
			"defense": 1,
			"slots": 1,
			"type": "armor",
			"quality": 1
		},
		{
			"count": 1,
			"damage": "d8",
			"hand": 1,
			"name": "sword",
			"quality": 3,
			"slots": 2,
			"type": "weapon"
		}
	],
	"itemSlots": 11,
	"level": 1,
	"maxHp": 8,
	"traits": {
		"physique": "athletic",
		"face": "round",
		"skin": "pockmarked",
		"hair": "limp",
		"clothing": "eccentric",
		"virtue": "loyal",
		"vice": "wasteful",
		"speech": "formal",
		"background": "herbalist",
		"misfortune": "framed"
	},
	"weapon": {
		"count": 1,
		"damage": "d8",
		"hand": 1,
		"name": "sword",
		"quality": 3,
		"slots": 2,
		"type": "weapon"
	},
	"abilities": {
		"charisma": { "bonus": 1, "defense": 11 },
		"constitution": { "bonus": 1, "defense": 11 },
		"dexterity": { "bonus": 2, "defense": 12 },
		"intelligence": { "bonus": 2, "defense": 12 },
		"strength": { "bonus": 2, "defense": 12 },
		"wisdom": { "bonus": 5, "defense": 15 }
	}
}
