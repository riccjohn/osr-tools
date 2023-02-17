import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import NavBar from '.'

export default {
  component: NavBar,
  title: 'Components/NavBar',
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = args => <NavBar />

export const Primary = Template.bind({})

Primary.args = {}
