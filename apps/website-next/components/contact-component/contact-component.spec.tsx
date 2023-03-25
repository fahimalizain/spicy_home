import { render } from '@testing-library/react';

import ContactComponent from './contact-component';

describe('ContactComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContactComponent />);
    expect(baseElement).toBeTruthy();
  });
});
