import { FC, useContext } from 'react';
import { XSVG } from '~/assets';
import { FetchContext, FilterContext } from '~/pages/ProductList';
import { startFetch } from '~/stores/fetchModule';
import { setSearchValue } from '~/stores/productListModule';

import { SearchTermWrapper, Term, X } from './index.style';

interface Props {
  term: string;
  removeTermOnList: (target: string) => void;
}

const SearchTerm: FC<Props> = ({ term, removeTermOnList }) => {
  const { dispatch } = useContext(FilterContext);
  const { dispatch: fetchDispatch } = useContext(FetchContext);

  const handleClickTerm = () => {
    dispatch(setSearchValue(term));
    fetchDispatch(startFetch());
  };

  return (
    <SearchTermWrapper>
      <Term onClick={handleClickTerm}>{term}</Term>
      <X src={XSVG} alt="x" onClick={() => removeTermOnList(term)} />
    </SearchTermWrapper>
  );
};

export default SearchTerm;
