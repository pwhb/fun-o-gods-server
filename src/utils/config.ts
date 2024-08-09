import STRINGS from './consts/strings.json';

export { STRINGS };

export const DEFAULT_LIMIT = 10;

export const TYPE = {
  number: 'number',
  json: 'json',
  string: 'string',
};

export const stringToCONST = (str: string) =>
  str
    .toUpperCase()
    .replace(/[\s]+/g, '_')
    .replace(/[^\w_]/g, '');

export const CONFIG = [
  {
    code: 'AUTH',
    name: 'Auth',
    value: '',
    type: TYPE.string,
    subConfigs: [
      {
        code: 'TOKEN_EXPIRY',
        name: 'Token Expiry',
        value: 20,
        type: TYPE.number,
      },
    ],
  },
];
