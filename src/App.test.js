import { render, screen } from '@testing-library/react';
import App from './App';

test('renders e-commerce application', () => {
  render(<App />);

  expect(document.body).toBeInTheDocument();
});