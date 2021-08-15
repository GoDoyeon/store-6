import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import RadioButton from '~/Components/RadioButton';

describe('<Button />', () => {
  it('should render component in document', () => {
    const { container } = render(
      <RadioButton isChecked label="~약관에 동의" />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render same with snapshot', () => {
    const { container } = render(
      <RadioButton isChecked label="~약관에 동의" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should fire onClick event', () => {
    const onClick = jest.fn();
    const { container } = render(
      <RadioButton isChecked label="~약관에 동의" onClick={onClick} />,
    );
    expect(onClick).toHaveBeenCalledTimes(0);
    const button = screen.getByText('~약관에 동의');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
