import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { KnaveCharacter } from '@/knave'
import KnaveCharacterDisplay from '.'

export default {
  component: KnaveCharacterDisplay,
  title: 'Characters/KnaveCharacter',
} as ComponentMeta<typeof KnaveCharacterDisplay>

const Template: ComponentStory<typeof KnaveCharacterDisplay> = args => {
  const character = new KnaveCharacter()
  character.generate()

  return <KnaveCharacterDisplay character={character} />
}

export const Primary = Template.bind({})

Primary.args = {}
