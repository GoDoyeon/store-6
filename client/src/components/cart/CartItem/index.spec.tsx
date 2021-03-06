import { render } from '@testing-library/react';
import 'jest-styled-components';

import CartItem from './index';

describe('<CartItem />', () => {
  it('should render same with snapshot', () => {
    const cartIdx = 1;
    const product = {
      idx: 1,
      title: 'test',
      thumbnail: 'test',
      discountedPrice: 2,
    };
    const changeAmount = () => {};
    const removeCartItem = () => {};
    const { container } = render(
      <CartItem
        cartIdx={cartIdx}
        product={product}
        changeAmount={changeAmount}
        removeCartItem={removeCartItem}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
