import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Spinner from '.'

export default {
  component: Spinner,
  title: 'Components/Spinner',
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = args => <Spinner />

export const Primary = Template.bind({})

Primary.args = {}
