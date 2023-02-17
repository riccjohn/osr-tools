import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'

describe('NavBar', () => {
  const pages = [
    { name: 'Dashboard', href: '#' },
    { name: 'Team', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'Calendar', href: '#' },
  ]

  test('displays an image that links to the main page', () => {
    render(<NavBar pages={pages} />)

    const logo = screen.getByTestId('home-link')

    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
  })

  test('displays a link to each given page', () => {
    render(<NavBar pages={pages} />)

    pages.forEach(page => {
      const pageLink = screen.getByText(page.name)
      expect(pageLink).toBeVisible()
      expect(pageLink).toHaveAttribute('href', page.href)
    })
  })
})
