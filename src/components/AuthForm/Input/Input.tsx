import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './Input.scss';

type InputElementType = 'email' | 'password';

interface Props {
  type: InputElementType;
  value: string;
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ type, value, setValue }) => {
  const { t } = useTranslation();
  switch (true) {
    case type === 'email':
      return (
        <label htmlFor="email-input">
          <input
            id="email-input"
            type="email"
            value={value}
            placeholder="Email"
            name="email"
            title=""
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            autoFocus={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event)}
          />
        </label>
      );
    case type === 'password':
      return (
        <label htmlFor="password-input">
          <input
            id="password-input"
            type="password"
            value={value}
            placeholder={`${t('password')}`}
            name="password"
            title=""
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event)}
          />
        </label>
      );
    default:
      return null;
  }
};
