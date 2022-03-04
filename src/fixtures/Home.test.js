import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { setupIntersectionObserverMock } from './IntersectionObserverMock';

setupIntersectionObserverMock();

test('renders UI Question header', () => {
  render(<Home />);
  const linkElement = screen.getByText(/UI Question/i);
  expect(linkElement).toBeInTheDocument();
});
