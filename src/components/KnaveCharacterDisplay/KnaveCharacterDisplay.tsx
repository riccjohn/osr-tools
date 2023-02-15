import React from 'react'
import { KnaveCharacter } from '@/knave'

interface IKnaveCharacterProps {
  character: KnaveCharacter
}

const KnaveCharacterDisplay: React.FC<IKnaveCharacterProps> = ({
  character,
}) => {
  const { abilityScores: abilities, copperPieces, maxHp, traits } = character

  return (
    <div className='container mx-auto'>
      {character && (
        <div className='container mx-auto flex flex-col px-1 text-black dark:text-white'>
          <section className='flex flex-col py-2 items-center'>
            <div className='flex'>
              <p className='mr-1'>
                <span className='font-bold'>HP: </span>
                <span className='text-base'>{maxHp}</span>
              </p>
              <p className='mr-1'>
                <span className='font-bold'>Copper: </span>
                <span className='text-base'>{`${copperPieces}`}</span>
              </p>
            </div>
          </section>
          <Traits traits={traits} />
          <AbilityScores abilityScores={abilities} />
          <Items character={character} />
        </div>
      )}
    </div>
  )
}

const Traits: React.FC<{ traits: ITraits }> = ({ traits }) => {
  const traitNames = Object.keys(traits)

  const traitsColumnOne = traitNames.slice(0, traitNames.length / 2)
  const traitsColumnTwo = traitNames.slice(traitNames.length / 2)

  return (
    <section className='flex w-full flex-col items-center py-2'>
      <h2 className='text-center text-lg font-bold'>Traits</h2>
      <div className='flex w-1/2 items-center justify-between'>
        <div className='w-fit'>
          {traitsColumnOne.map(traitName => (
            <Trait
              key={traitName}
              name={traitName}
              description={traits[traitName as INoun]}
            />
          ))}
        </div>
        <div className='w-fit'>
          {traitsColumnTwo.map(traitName => (
            <Trait
              key={traitName}
              name={traitName}
              description={traits[traitName as INoun]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const Trait: React.FC<{ name: string; description: string }> = ({
  name,
  description,
}) => (
  <p data-testid={name} className='w-fit'>
    <span className='font-bold capitalize'>{`${name}: `}</span>
    <span className='text-base capitalize'>{description}</span>
  </p>
)

const AbilityScores: React.FC<{ abilityScores: IAbilities }> = ({
  abilityScores,
}) => {
  return (
    <section className='flex w-full flex-col items-center py-2'>
      <h2 className='text-center text-lg font-bold'>Abilities</h2>

      <div className='w-1/2'>
        <table className='w-full border-collapse'>
          <thead>
            <tr role='row'>
              <th role='cell'>Defense</th>
              <th role='cell'>Ability</th>
              <th role='cell'>Bonus</th>
            </tr>
          </thead>
          <tbody>
            <AbilityRow
              label={'STR'}
              bonus={abilityScores.strength.bonus}
              defense={abilityScores.strength.defense}
            />
            <AbilityRow
              label='CON'
              bonus={abilityScores.constitution.bonus}
              defense={abilityScores.constitution.defense}
            />
            <AbilityRow
              label='DEX'
              bonus={abilityScores.dexterity.bonus}
              defense={abilityScores.dexterity.defense}
            />
            <AbilityRow
              label='INT'
              bonus={abilityScores.intelligence.bonus}
              defense={abilityScores.intelligence.defense}
            />
            <AbilityRow
              label='WIS'
              bonus={abilityScores.wisdom.bonus}
              defense={abilityScores.wisdom.defense}
            />
            <AbilityRow
              label='CHA'
              bonus={abilityScores.charisma.bonus}
              defense={abilityScores.charisma.defense}
            />
          </tbody>
        </table>
      </div>
    </section>
  )
}

interface IAbilityRowProps {
  bonus: number
  defense: number
  label: string
}

const AbilityRow: React.FC<IAbilityRowProps> = ({ bonus, defense, label }) => {
  return (
    <tr
      role='row'
      data-testid={`${label.toLowerCase()}-row`}
      className='w-fit text-center'
    >
      <td role='cell'>{defense}</td>
      <th role='cell'>{label}</th>
      <td role='cell'>{bonus}</td>
    </tr>
  )
}

const Items: React.FC<IKnaveCharacterProps> = ({ character }) => {
  const { items, itemSlots } = character
  const itemSlotsUsed = items.reduce((acc, curr) => acc + curr.slots, 0)

  return (
    <section className='flex w-full flex-col items-center py-2'>
      <h2 className='text-center text-lg font-bold'>Weapons & Gear</h2>
      <p data-testid='item-slots-used'>
        {`Item Slots Used: ${itemSlotsUsed}/${itemSlots}`}
      </p>
      <div className='w-1/2'>
        <table className='w-full'>
          <thead>
            <tr role='row' className='text-center'>
              <th role='cell' data-testid='item-name-heading'>
                Item
              </th>
              <th role='cell' data-testid='item-defense-heading'>
                Defense
              </th>
              <th role='cell' data-testid='item-damage-heading'>
                Damage
              </th>
              <th role='cell' data-testid='item-slots-heading'>
                Slots
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <ItemRow item={item} key={`${item.name}-${idx}`} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

interface IItemRowProps {
  item: Item
}

const ItemRow: React.FC<IItemRowProps> = ({ item }) => {
  const hyphenatedItemName = item.name.split(' ').join('-')
  return (
    <tr
      role='row'
      data-testid={`${hyphenatedItemName}-row`}
      className='text-center'
    >
      <td role='cell' data-testid='item-name'>
        {item.name}
      </td>
      <td role='cell' data-testid='item-defense'>
        {item.defense ? item.defense : '-'}
      </td>
      <td role='cell' data-testid='item-damage'>
        {item.damage ? item.damage : '-'}
      </td>
      <td role='cell' data-testid='item-slots'>
        {item.slots}
      </td>
    </tr>
  )
}

export default KnaveCharacterDisplay
