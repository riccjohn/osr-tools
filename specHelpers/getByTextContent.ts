import { screen } from '@testing-library/react'

const getByTextContent = (text: string) => {
  return screen.getByText(
    (_content: string, element: Element | null): boolean => {
      const hasText = (element: Element) => element.textContent === text
      const elementHasText = hasText(element as Element)
      const childrenDontHaveText = Array.from(element?.children || []).every(
        child => !hasText(child),
      )
      return elementHasText && childrenDontHaveText
    },
  )
}

export default getByTextContent
