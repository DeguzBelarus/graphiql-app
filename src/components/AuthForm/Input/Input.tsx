import { FC } from 'react';

import './Input.scss';

type InputElementType = 'email' | 'password';

interface Props {
  type: InputElementType;
  value: string;
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ type, value, setValue }) => {
  switch (true) {
    case type === 'email':
      return (
        <label htmlFor="login-email-input">
          <input
            id="email-input"
            type="email"
            value={value}
            placeholder="Email"
            name="email"
            title=""
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoFocus={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event)}
          />
        </label>
      );
    case type === 'password':
      return (
        <label htmlFor="login-password-input">
          <input
            id="password-input"
            type="password"
            value={value}
            placeholder="Password"
            name="password"
            title=""
            autoCapitalize="off"
            autoCorrect="off"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event)}
          />
        </label>
      );
    default:
      return null;
  }
};
