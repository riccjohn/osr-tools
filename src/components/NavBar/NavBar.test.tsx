import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'

describe('NavBar', () => {
  test('displays a link to generate a knave character', () => {
    render(<NavBar />)

    expect(screen.getByText('Knave')).toBeInTheDocument()
    expect(screen.getByText('Knave')).toHaveAttribute('href', '/knave/generate-character')
  })
})
