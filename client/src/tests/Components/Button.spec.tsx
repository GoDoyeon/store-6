import React from 'react';
import styled from 'styled-components';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Button from '~/Components/Button';

describe('<Button />', () => {
  it('should render component in document', () => {
    const { container } = render(<Button />);
    expect(container).toBeInTheDocument();
  });

  /**
   * toMatchInlineSnapshot 안에 있는 내용은 프로그래머가 직접 작성하지 않습니다.
   * 안에 인자를 비워두고 실행하면 내부의 스트링을 jest가 자동으로 완성시켜줍니다.
   * Snapshot을 비교해서 ui가 얼마나 바뀌는지 확인할 수 있습니다.
   */
  it('should render <Button /> same with snapshop', () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });

  it('should render wrapped button', () => {
    const ButtonWrapper = styled.div`
      display: flex;
      margin-top: 32px;
      height: 55px;
      width: 183px;
    `;

    const { container } = render(
      <ButtonWrapper>
        <Button>버튼</Button>
      </ButtonWrapper>,
    );
    expect(container).toMatchSnapshot();
  });
});
