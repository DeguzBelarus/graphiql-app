// types
export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type VoidMethod = () => void;
export type CurrentLanguageType = 'en' | 'ru';

// event handler type
export type EventHandler<T, K = void> = (event: T, param?: K) => void;

// universal generics interfaces
export interface IObjectOfObjects<T> {
  [key: string]: T;
}

// interfaces
export interface ILocalStorageSave {
  currentLanguage: CurrentLanguageType;
}

export type SeverityType = 'positive' | 'negative' | 'neutral';

export interface ISystemMessageObject {
  message: string;
  severity: SeverityType;
}

export interface IAuthFormData {
  email: string;
  password: string;
}
