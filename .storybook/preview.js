import '../src/app/globals.css'
import { withTailwindTheme } from './withTailwindTheme.decorator';

export const decorators = [withTailwindTheme];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};
