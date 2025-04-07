import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nafiyad Adane name on the page', () => {
  render(<App />);
  const nameElement = screen.getByText(/Nafiyad Adane/i);
  expect(nameElement).toBeInTheDocument();
});