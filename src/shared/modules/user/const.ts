import { Range } from '#types/range.interface.js';

export const DEFAULT_AVATAR_FILE_NAME = '/unknown-raccoon.svg';

export const UserNameLimit: Range = {
  Min: 1,
  Max: 15,
};

export const PasswordLimit: Range = {
  Min: 6,
  Max:12,
};
