export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Director {
  name: string;
  address: Address;
}

export const emptyDirector: Director = {
  name: '',
  address: {
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  },
};