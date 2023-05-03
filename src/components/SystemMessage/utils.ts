import { SeverityType } from '../../types/types';

export const messageClassNameGenerator = (severity: SeverityType) => {
  switch (true) {
    case severity === 'negative':
      return ' error';
    case severity === 'positive':
      return ' success';
    default:
      return '';
  }
};
