import { parsePhoneNumberWithError } from 'libphonenumber-js';

import { createCheck } from './create';

type DefaultCountry = Parameters<typeof parsePhoneNumberWithError>[1];

export const phoneNumberCheck = createCheck(
  (input: string, defaultCountry?: DefaultCountry) => {
    try {
      return parsePhoneNumberWithError(input, defaultCountry).isValid();
    } catch {
      return false;
    }
  },
);
