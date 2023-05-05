import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

import { getSystemMessage, getAuthRequestStatus } from '../../redux/slices/mainSlice';
import { SYSTEM_MESSAGE_AUTO_HIDE_DURATION } from '../../constants/constants';
import { messageClassNameGenerator } from './utils';
import './SystemMessage.scss';

export const SystemMessage: FC = () => {
  const authStatus = useAppSelector(getAuthRequestStatus);
  const authMessage = useAppSelector(getSystemMessage);
  const [message, setMessage] = useState<string>();
  const [isShown, setIsShown] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const newMessage = authMessage?.message;
    if (newMessage) {
      setMessage(newMessage);
      clearTimeout(timer);
      setIsShown(true);
      setTimer(
        setTimeout(() => {
          setIsShown(false);
        }, SYSTEM_MESSAGE_AUTO_HIDE_DURATION)
      );
    } else {
      setIsShown(false);
      setMessage(undefined);
    }
    return () => clearTimeout(timer);
  }, [authMessage]);
  if (authStatus !== 'loading' && authMessage) {
    return (
      <div
        className={
          isShown
            ? `system-message-wrapper${messageClassNameGenerator(authMessage.severity)} shown`
            : `system-message-wrapper${messageClassNameGenerator(authMessage.severity)}`
        }
      >
        <p
          className={
            isShown
              ? `message-paragraph${messageClassNameGenerator(authMessage.severity)} shown`
              : `message-paragraph${messageClassNameGenerator(authMessage.severity)}`
          }
        >
          {message}
        </p>
      </div>
    );
  }
  return null;
};
