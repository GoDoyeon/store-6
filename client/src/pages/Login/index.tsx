import { FC, useCallback, useContext, useEffect, useState } from 'react';

import useInputValidator from '~/lib/hooks/useInputValidator';
import { idValidator, pwValidator } from '~/utils/validation';
import { alert } from '~/utils/modal';
import { login } from '~/lib/api/auth';

import Input from '~/components/common/Input';
import Button from '~/components/common/Button';
import Divider from '~/components/common/Divider';
import Copyright from '~/components/base/Copyright';
import InputHelp from '~/components/login/InputHelp';

import {
  doodleTeasingSVG,
  doodleSkeletonSVG,
  doodleStickmanSVG,
  doodleAssKickSVG,
  verticalLineSVG,
  socialFacebookSVG,
  socialGoogleSVG,
} from '~/assets';

import S from './index.style';
import { useHistory, useLocation } from '~/core/Router';
import { ErrorResponse } from '~/lib/api/types';
import { oauthUrl } from '~/lib/api/oauth';
import UserContext from '~/lib/contexts/userContext';
import { setLogin } from '~/stores/userModule';

import * as usersApi from '~/lib/api/users';
import HeaderTitle from '~/components/base/HeaderTitle';

const MESSAGE_LOGIN_FAIL = '로그인 실패';

const LoginPage: FC = () => {
  const { state } = useLocation();
  const { goBack, push } = useHistory();
  const [id, idWarning, handleId] = useInputValidator(
    (state as { id: string; from: string })?.id ?? '',
    idValidator,
  );
  const [pw, pwWarning, handlePW] = useInputValidator('', pwValidator);
  const [isPageAccessed, setIsPageAccessed] = useState(false);
  const { user: userState, userDispatch } = useContext(UserContext);

  useEffect(() => {
    if (!isPageAccessed && userState.isLoggedIn) {
      push('/', { from: '/login', error: 'accessWithToken' });
    }
  }, [userState.isLoggedIn, isPageAccessed]);

  const requestLogin = (uid: string, password: string) =>
    login({ id: uid, password })
      .then(usersApi.getMe)
      .then((res) => {
        userDispatch(setLogin(res.data));
      })
      .then(goBack)
      .catch((err: ErrorResponse) => {
        if (err.message === 'Unauthorized') {
          alert(
            '로그인에 실패하였습니다. 아이디, 비밀번호를 다시 확인해보세요.',
          );
        }
      });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPageAccessed(true);

    if (idWarning.length > 2 || id.length < 4) {
      alert(MESSAGE_LOGIN_FAIL);
      return;
    }
    if (pwWarning) {
      alert(MESSAGE_LOGIN_FAIL);
      return;
    }

    requestLogin(id, pw);
  };

  const onGoogleLogin = useCallback(() => {
    window.location.href = oauthUrl.google.login;
  }, []);

  const onFacebookLogin = useCallback(() => {
    window.location.href = oauthUrl.facebook.login;
  }, []);

  const DEMO_ID = 'store6';
  const DEMO_PW = 'qudgus&dlsrb&dbstj&whdgh';
  const onDemoLogin = () => {
    setIsPageAccessed(true);
    requestLogin(DEMO_ID, DEMO_PW);
  };

  return (
    <S.StyledLoginPage>
      <S.LeftDoodles>
        <div>
          <img src={doodleTeasingSVG} alt="teasing" />
        </div>
        <div style={{ marginLeft: '96px' }}>
          <img src={doodleSkeletonSVG} alt="skeleton" />
        </div>
      </S.LeftDoodles>
      <S.LoginForm onSubmit={onSubmit}>
        <HeaderTitle />
        <Input
          autoComplete="off"
          type="text"
          autoFocus
          value={id}
          placeholder="아이디"
          onChange={handleId}
        />
        <InputHelp />
        <Input
          autoComplete="off"
          type="password"
          placeholder="비밀번호"
          onChange={handlePW}
        />
        <InputHelp />
        <S.ButtonWrapper>
          <Button size="lg">로그인</Button>
        </S.ButtonWrapper>
        <S.RegisterSection>
          <S.LoginDemo onClick={onDemoLogin}>시연용 계정 로그인</S.LoginDemo>
          <S.RegisterLink
            onClick={() => {
              push('/signup/select');
            }}
          >
            회원가입
          </S.RegisterLink>
        </S.RegisterSection>
        <Divider />
        <S.SocialButtons>
          <S.SocialButton
            src={socialFacebookSVG}
            alt="facebook"
            onClick={onFacebookLogin}
          />
          <img src={verticalLineSVG} alt="vertical" />
          <S.SocialButton
            src={socialGoogleSVG}
            alt="google"
            onClick={onGoogleLogin}
          />
        </S.SocialButtons>
        <Copyright>
          COPYRIGHT © 2021 우아한형제들 ALL RIGHTS RESERVED.
        </Copyright>
      </S.LoginForm>
      <S.RightDoodles>
        <img src={doodleStickmanSVG} alt="stickman" />
        <img
          src={doodleAssKickSVG}
          alt="assKick"
          style={{ marginTop: '16px' }}
        />
      </S.RightDoodles>
    </S.StyledLoginPage>
  );
};

export default LoginPage;
