import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './Input.scss';

type InputElementType = 'email' | 'password' | 'header-name' | 'header-value';

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
    case type === 'header-name':
      return (
        <label htmlFor="header-name-input" className="header-input-label">
          <input
            id="header-name-input"
            className="header-input"
            type="text"
            value={value}
            placeholder={`${t('headerNameCap')}`}
            name="headerName"
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
    case type === 'header-value':
      return (
        <label htmlFor="header-value-input" className="header-input-label">
          <input
            id="header-value-input"
            className="header-input"
            type="text"
            value={value}
            placeholder={`${t('headerValueCap')}`}
            name="headerValue"
            title=""
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event)}
          />
        </label>
      );
    default:
      return null;
  }
};
