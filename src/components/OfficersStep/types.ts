export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Officer {
  name: string;
  title: string;
  address: Address;
}

export const emptyOfficer: Officer = {
  name: '',
  title: '',
  address: {
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
};