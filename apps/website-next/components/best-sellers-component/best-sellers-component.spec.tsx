import { render } from '@testing-library/react';

import BestSellersComponent from './best-sellers-component';

describe('BestSellersComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BestSellersComponent />);
    expect(baseElement).toBeTruthy();
  });
});
