import { render, screen } from '@testing-library/react';
import App from './App';

test('shows the personal project portfolio', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /rahul mahajan/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^projects$/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /drishti/i })).toBeInTheDocument();
});
