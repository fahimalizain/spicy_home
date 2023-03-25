import { render } from '@testing-library/react';

import ReviewsComponent from './reviews-component';

describe('ReviewsComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReviewsComponent />);
    expect(baseElement).toBeTruthy();
  });
});
