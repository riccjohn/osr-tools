import { render, screen, within } from '@testing-library/react'
import { KnaveCharacter } from '@/knave'
import getByTextContent from 'specHelpers/getByTextContent'
import KnaveCharacterDisplay from './KnaveCharacterDisplay'

describe('KnaveCharacterDislpay', () => {
  let character: KnaveCharacter

  beforeAll(() => {
    character = new KnaveCharacter()
    character.generate()
  })

  test('displays characters max hp', () => {
    render(<KnaveCharacterDisplay character={character} />)

    expect(getByTextContent(`HP: ${character.maxHp}`)).toBeVisible()
  })

  test('displays the characters copper pieces', () => {
    render(<KnaveCharacterDisplay character={character} />)

    expect(getByTextContent(`Copper: ${character.copperPieces}`)).toBeVisible()
  })

  test('displays the characters traits', () => {
    render(<KnaveCharacterDisplay character={character} />)
    const { traits } = character

    const individualTraits = Object.keys(traits).map(trait => {
      return { [trait]: traits[trait as INoun] }
    })

    individualTraits.forEach(trait => {
      const key = Object.keys(trait)[0]
      expect(getByTextContent(`${key}: ${trait[key]}`))
    })
  })

  describe('ability scores', () => {
    test('displays the characters strenth bonus and defense', () => {
      render(<KnaveCharacterDisplay character={character} />)

      const row = screen.getByTestId('str-row')
      const defense = within(row).getByText(character.strength.defense)
      const bonus = within(row).getByText(character.strength.bonus)

      expect(defense).toBeVisible()
      expect(bonus).toBeVisible()
    })

    test('displays the characters constitution bonus and defense', () => {
      render(<KnaveCharacterDisplay character={character} />)

      const row = screen.getByTestId('con-row')
      const defense = within(row).getByText(character.constitution.defense)
      const bonus = within(row).getByText(character.constitution.bonus)

      expect(defense).toBeVisible()
      expect(bonus).toBeVisible()
    })

    test('displays the characters dexterity bonus and defense', () => {
      render(<KnaveCharacterDisplay character={character} />)

      const row = screen.getByTestId('dex-row')
      const defense = within(row).getByText(character.dexterity.defense)
      const bonus = within(row).getByText(character.dexterity.bonus)

      expect(defense).toBeVisible()
      expect(bonus).toBeVisible()
    })

    test('displays the characters intelligence bonus and defense', () => {
      render(<KnaveCharacterDisplay character={character} />)

      const row = screen.getByTestId('int-row')
      const defense = within(row).getByText(character.intelligence.defense)
      const bonus = within(row).getByText(character.intelligence.bonus)

      expect(defense).toBeVisible()
      expect(bonus).toBeVisible()
    })

    test('displays the characters wisdom bonus and defense', () => {
      render(<KnaveCharacterDisplay character={character} />)

      const row = screen.getByTestId('wis-row')
      const defense = within(row).getByText(character.wisdom.defense)
      const bonus = within(row).getByText(character.wisdom.bonus)

      expect(defense).toBeVisible()
      expect(bonus).toBeVisible()
    })
  })

  describe('items', () => {
    test('displays the number of used and available item slots', () => {
      render(<KnaveCharacterDisplay character={character} />)

      const slotsUsed = character.items.reduce((acc, curr) => acc + curr.slots, 0)

      expect(screen.getByText(`Item Slots Used: ${slotsUsed}/${character.itemSlots}`))
    })

    test('displays a row for each item', () => {
      render(<KnaveCharacterDisplay character={character} />)

      const { items } = character

      items.forEach((item: Item) => {
        const hyphenatedItemName = item.name.split(' ').join('-')
        const rows = screen.getAllByTestId(`${hyphenatedItemName}-row`)

        rows.forEach(row => {
          const name = within(row).getByTestId('item-name')
          const slots = within(row).getByTestId('item-slots')
          const defense = within(row).getByTestId('item-defense')
          const damage = within(row).getByTestId('item-damage')

          expect(name).toHaveTextContent(item.name)
          expect(name).toBeVisible()

          expect(slots).toHaveTextContent(item.slots.toString())
          expect(slots).toBeVisible()

          if (item.type === 'weapon') {
            expect(damage).toHaveTextContent(item.damage!)
          } else {
            expect(damage).toHaveTextContent('-')
          }

          if (item.type === 'armor') {
            expect(defense).toHaveTextContent(item.defense!.toString())
          } else {
            expect(defense).toHaveTextContent('-')
          }
        })
      })
    })
  })
})
