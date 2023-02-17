import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import NavBar from '.'

export default {
  component: NavBar,
  title: 'Components/NavBar',
} as ComponentMeta<typeof NavBar>

const pages = [
  { name: 'Dashboard', href: '#' },
  { name: 'Team', href: '#' },
  { name: 'Projects', href: '#' },
  { name: 'Calendar', href: '#' },
]

const Template: ComponentStory<typeof NavBar> = args => <NavBar pages={pages} />

export const Primary = Template.bind({})

Primary.args = {}
