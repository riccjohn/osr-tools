import React from 'react'
import { KnaveCharacter } from '@/knave'

interface IKnaveCharacterProps {
  character: KnaveCharacterData
}

const KnaveCharacterDisplay: React.FC<IKnaveCharacterProps> = ({
  character,
}) => {
  const { abilities, copperPieces, maxHp, traits } = character

  return (
    <div className='container mx-auto'>
      {character && (
        <div className='container mx-auto flex flex-col px-1 text-black dark:text-white'>
          <section className='flex flex-col py-2'>
            <p className=''>
              <span className='font-bold'>Name: </span>
              <span className='text-base'>FooBar Baz</span>
            </p>
            <div className='flex'>
              <p className='mr-1'>
                <span className='font-bold'>HP: </span>
                <span className='text-base'>{`${maxHp}`}</span>
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
  return (
    <section className='flex flex-col py-2'>
      <h2 className='text-center text-lg font-bold'>Traits</h2>
      <div className='text-base'>
        {Object.keys(traits).map((trait: string) => {
          return (
            <p key={trait} data-testid={trait}>
              <span className='font-bold capitalize'>{`${trait}: `}</span>
              <span className='text-base capitalize'>
                {traits[trait as INoun]}
              </span>
            </p>
          )
        })}
      </div>
    </section>
  )
}

const AbilityScores: React.FC<{ abilityScores: IAbilities }> = ({
  abilityScores,
}) => {
  return (
    <section className='flex flex-col py-2'>
      <h2 className='text-center text-lg font-bold'>Abilities</h2>

      <table className='max-w-xl'>
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
    <tr role='row' className=''>
      <td role='cell'>{defense}</td>
      <th role='cell'>{label}</th>
      <td role='cell'>{bonus}</td>
    </tr>
  )
}

const Items: React.FC<IKnaveCharacterProps> = ({ character }) => {
  const { items, itemSlots } = character
  const maxItemSlots = itemSlots
  const itemSlotsUsed = items.reduce((acc, curr) => acc + curr.slots, 0)

  return (
    <section className='flex flex-col py-2'>
      <h2 className='text-center text-lg font-bold'>Weapons & Gear</h2>
      <p data-testid='item-slots-used'>
        {`Item Slots Used: ${itemSlotsUsed}/${maxItemSlots}`}
      </p>
      <table>
        <thead>
          <tr role='row'>
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
          {items.map((item: any, idx) => (
            <ItemRow item={item} key={`${item.name}-${idx}`} />
          ))}
        </tbody>
      </table>
    </section>
  )
}

interface IItemRowProps {
  item: {
    count: number
    name: string
    defense?: number
    damage?: number
    slots: number
  }
}

const ItemRow: React.FC<IItemRowProps> = ({ item }) => (
  <tr role='row'>
    <td role='cell'>{item.name}</td>
    <td role='cell'>{item.defense ? item.defense : '-'}</td>
    <td role='cell'>{item.damage ? item.damage : '-'}</td>
    <td role='cell'>{item.slots}</td>
  </tr>
)

export default KnaveCharacterDisplay
