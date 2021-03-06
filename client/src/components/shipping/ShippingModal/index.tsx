import React, { FC, useRef, useState } from 'react';
import DaumPostcode, { AddressData } from 'react-daum-postcode';
import { cancleSVG, hyphenSVG, underbaeminSVG } from '~/assets';
import Button from '~/components/common/Button';
import Divider from '~/components/common/Divider';
import useInputValidator from '~/lib/hooks/useInputValidator';
import useOnClickOutside from '~/lib/hooks/useOnClickOutside';
import { alert } from '~/utils/modal';
import { ph0Validator, ph1Validator, ph2Validator } from '~/utils/validation';
import { ShipType } from '~/components/shipping/Shipping';
import {
  ModalWrapper,
  PhoneInputWrapper,
  PhoneInput,
  Title,
  Name,
  NameInputWrapper,
  Phone,
  Address,
  Post,
  PostInputWrapper,
  ButtonWrapper,
  PostCode,
} from './index.style';

interface Props {
  handleModalClose: () => void;
  handleWriteShipping(info: ShipType): void;
  handleUpdateShipping(info: ShipType): void;
  isWrite: boolean;
  modifyItem: ShipType;
}

const ShippingModal: FC<Props> = ({
  handleModalClose,
  handleWriteShipping,
  handleUpdateShipping,
  isWrite,
  modifyItem,
}) => {
  const confirmModalRef = useRef();
  useOnClickOutside(confirmModalRef, () => {
    handleModalClose();
  });

  const [name, setName] = useState<string>(isWrite ? '' : modifyItem.name);
  const [ph0, , handlePh0] = useInputValidator(
    isWrite ? '' : modifyItem.phone.split('-')[0],
    ph0Validator,
  );
  const [ph1, , handlePh1] = useInputValidator(
    isWrite ? '' : modifyItem.phone.split('-')[1],
    ph1Validator,
  );
  const [ph2, , handlePh2] = useInputValidator(
    isWrite ? '' : modifyItem.phone.split('-')[2],
    ph2Validator,
  );
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>(isWrite ? '' : modifyItem.code);
  const [address, setAddress] = useState<string>(
    isWrite ? '' : modifyItem.address,
  );
  const [detailAddress, setDetailAddress] = useState<string>(
    isWrite ? '' : modifyItem.detailAddress,
  );

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePostModalOpen = () => {
    setIsPostModalOpen(true);
  };

  const handlePostModalClose = () => {
    setIsPostModalOpen(false);
  };

  const handleChangeDetailAddress = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDetailAddress(e.target.value);
  };

  const handleComplete = (data: AddressData) => {
    let fullAddress = data.address;
    let extraAddress = '';
    /**
     * addressType R??? ????????? ?????? ????????? ???????????????(Road).
     * bnamed??? ???????????? ???????????????.
     */
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress);
    setCode(data.zonecode);
    handlePostModalClose();
  };

  const emptyEssage = '??? ????????? ????????????.';
  const phoneInvalid = '????????? ???????????? ????????? ????????????.';

  const validationCheck = () => {
    if (!name || !ph0 || !ph1 || !ph2 || !code || !address) {
      alert(emptyEssage);
      return;
    }

    if (ph0Validator(ph0) || ph1Validator(ph1) || ph2Validator(ph2)) {
      alert(phoneInvalid);
      return;
    }

    const phone = `${ph0}-${ph1}-${ph2}`;

    const info = {
      name,
      phone,
      code,
      address,
      detailAddress,
    };

    if (isWrite) {
      handleWriteShipping(info);
    } else {
      handleUpdateShipping(info);
    }
  };

  return (
    <ModalWrapper ref={confirmModalRef}>
      <Title>
        <div>{isWrite ? '????????????' : '????????????'}</div>
        <button
          type="button"
          onClick={() => {
            handleModalClose();
          }}
        >
          <img alt="close" src={cancleSVG} />
        </button>
      </Title>
      <Divider width="640px" direction="horizontal" />
      <Name>
        <div>???????????? ??? ??????</div>
        <NameInputWrapper>
          <input
            type="text"
            placeholder="?????? ??????"
            value={name}
            onChange={handleChangeName}
          />
          <Divider width="400px" direction="horizontal" />
        </NameInputWrapper>
      </Name>
      <Divider width="640px" direction="horizontal" />
      <Phone>
        <div>?????????</div>
        <PhoneInputWrapper>
          <div style={{ width: '100px' }}>
            <PhoneInput
              autoComplete="off"
              type="text"
              value={ph0}
              placeholder="010"
              onChange={handlePh0}
              maxLength={3}
            />
            <img src={underbaeminSVG} alt="underline" />
          </div>
          <img src={hyphenSVG} alt="hyphen" />
          <div style={{ width: '100px' }}>
            <PhoneInput
              autoComplete="off"
              type="text"
              value={ph1}
              placeholder="0000"
              onChange={handlePh1}
              maxLength={4}
            />
            <img src={underbaeminSVG} alt="underline" />
          </div>
          <img src={hyphenSVG} alt="hyphen" />
          <div style={{ width: '100px' }}>
            <PhoneInput
              autoComplete="off"
              type="text"
              value={ph2}
              placeholder="0000"
              onChange={handlePh2}
              maxLength={4}
            />
            <img src={underbaeminSVG} alt="underline" />
          </div>
        </PhoneInputWrapper>
      </Phone>
      <Divider width="640px" direction="horizontal" />
      <Address>
        <div>??????</div>
        <div>
          <Post>
            <div>
              <input type="text" value={code} disabled />
              <Divider width="280px" direction="horizontal" />
            </div>
            <Button size="sm" onClick={handlePostModalOpen}>
              ???????????? ??????
            </Button>
          </Post>
          <input
            type="text"
            value={address}
            style={{ width: '410px' }}
            disabled
          />
          <Divider width="410px" direction="horizontal" />
          <PostInputWrapper>
            <input
              style={{ width: '410px' }}
              type="text"
              value={detailAddress}
              placeholder="???????????? ??????"
              onChange={handleChangeDetailAddress}
            />
            <Divider width="410px" direction="horizontal" />
          </PostInputWrapper>
        </div>
      </Address>
      <ButtonWrapper>
        <Button size="md" onClick={validationCheck}>
          {isWrite ? '??????' : '??????'}
        </Button>
      </ButtonWrapper>
      {isPostModalOpen && (
        <PostCode>
          <div>
            <button
              type="button"
              onClick={() => {
                handlePostModalClose();
              }}
            >
              <img src={cancleSVG} alt="close" />
            </button>
          </div>
          <DaumPostcode onComplete={handleComplete} />
        </PostCode>
      )}
    </ModalWrapper>
  );
};

export default ShippingModal;
