import React, { ReactElement } from 'react'
import { KnaveCharacter } from '@/knave'

interface IKnaveCharacterProps {
  character: KnaveCharacter
}

const KnaveCharacterDisplay: React.FC<IKnaveCharacterProps> = ({
  character,
}) => {
  const { abilityScores: abilities, copperPieces, maxHp, traits } = character

  return (
    <div className='container mx-auto my-5'>
      <div className='container mx-auto flex flex-col items-center px-1 text-black dark:text-white'>
        <h1 className='font-sebaldusGotisch text-5xl text-[#FFE747] bg-black px-1.5 mb-10'>Knave</h1>
        <section className='flex flex-col items-center py-2'>
          <div className='flex items-center'>
            <p className='mr-4'>
              <span className='font-sebaldusGotisch text-xl'>HP: </span>
              <span className='font-sebaldusGotisch text-lg'>{maxHp}</span>
            </p>
            <p className='mr-4'>
              <span className='font-sebaldusGotisch text-xl'>Copper: </span>
              <span className='font-sebaldusGotisch text-lg'>{`${copperPieces}`}</span>
            </p>
          </div>
        </section>
        <Traits traits={traits} />
        <AbilityScores abilityScores={abilities} />
        <Items character={character} />
      </div>
    </div>
  )
}

const Traits: React.FC<{ traits: ITraits }> = ({ traits }) => {
  const traitNames = Object.keys(traits)

  const traitsColumnOne = traitNames.slice(0, traitNames.length / 2)
  const traitsColumnTwo = traitNames.slice(traitNames.length / 2)

  return (
    <Section sectionTitle='Traits'>
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
    </Section>
  )
}

const Trait: React.FC<{ name: string; description: string }> = ({
  name,
  description,
}) => (
  <p data-testid={name} className='w-fit'>
    <span className='font-sebaldusGotisch text-xl capitalize'>{`${name}: `}</span>
    <span className='text-base capitalize'>{description}</span>
  </p>
)

const AbilityScores: React.FC<{ abilityScores: IAbilities }> = ({
  abilityScores,
}) => {
  return (
    <Section sectionTitle='Abilities'>
      <div className='w-1/2'>
        <table className='w-full border-collapse'>
          <thead>
            <tr role='row' className='font-sebaldusGotisch text-xl'>
              <th role='cell' className='flex justify-center'>
                <p className='w-fit bg-black px-1 font-sebaldusGotisch text-xl text-[#FFE747]'>
                  Defense
                </p>
              </th>
              <th role='cell' />
              <th role='cell' className='flex justify-center'>
                <p className='w-fit bg-black px-1 font-sebaldusGotisch text-xl text-[#FFE747]'>
                  Bonus
                </p>
              </th>
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
    </Section>
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
      <th role='cell' className='font-sebaldusGotisch text-2xl'>
        {label}
      </th>
      <td role='cell'>{bonus}</td>
    </tr>
  )
}

const Items: React.FC<IKnaveCharacterProps> = ({ character }) => {
  const { items, itemSlots } = character
  const itemSlotsUsed = items.reduce((acc, curr) => acc + curr.slots, 0)

  return (
    <Section sectionTitle='Weapons & Gear'>
      <p
        data-testid='item-slots-used'
        className='mb-4 flex items-center font-sebaldusGotisch text-2xl'
      >
        {`Item Slots Used: `}
        <span className='pl-2 font-sans text-base'>{`${itemSlotsUsed}/${itemSlots}`}</span>
      </p>
      <div className='w-1/2'>
        <table className='w-full'>
          <thead>
            <tr role='row' className='text-center'>
              <th
                role='cell'
                data-testid='item-name-heading'
                className='font-sebaldusGotisch text-2xl'
              >
                Item
              </th>
              <th
                role='cell'
                data-testid='item-defense-heading'
                className='font-sebaldusGotisch text-2xl'
              >
                Defense
              </th>
              <th
                role='cell'
                data-testid='item-damage-heading'
                className='font-sebaldusGotisch text-2xl'
              >
                Damage
              </th>
              <th
                role='cell'
                data-testid='item-slots-heading'
                className='font-sebaldusGotisch text-2xl'
              >
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
    </Section>
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

const Section: React.FC<{
  sectionTitle: string
  children: React.ReactNode
}> = ({ sectionTitle, children }) => (
  <section className='mb-16 flex w-full flex-col items-center py-2'>
    <h2 className='mb-10 bg-black px-1.5 pt-0.5 font-sebaldusGotisch text-3xl text-[#FFE747]'>
      {sectionTitle}
    </h2>
    {children}
  </section>
)

export default KnaveCharacterDisplay
