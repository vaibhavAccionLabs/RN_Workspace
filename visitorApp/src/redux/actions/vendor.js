import * as TYPES from 'redux/types';

export const vendorEntrySuccess = payload => {
  return {
    type: TYPES.VENDOR_ENTRY_SUCCESS,
    payload
  };
};

export const vendorEntryFail = msg => {
  return {
    type: TYPES.VENDOR_ENTRY_ERROR,
    msg
  };
};

export const vendorEntryData = (
  firstName,
  lastName,
  phone,
  vendorName,
  attenderName,
  purpose
) => {
  return {
    type: TYPES.VENDOR_ENTRY_SUCCESS,
    payload: {
      body: { firstName, lastName, phone, vendorName, attenderName, purpose },
      onsuccess: vendorEntrySuccess,
      onerror: vendorEntryFail
    }
  };
};
