import VENDOR_IMG from './assets/images/icons/Vendor.png';

const AUTH = process.env.REACT_APP_AUTH;
export const API_BASE_URL = 'https://rwaapi.briclay.com/api/v1/';

export const VALIDATOR = {
  phoneNumber: /^[0-9]{0,10}$/,
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export const API = {
  rwa: {
    login: `${API_BASE_URL}auth/signin`,
    devices: `${API_BASE_URL}users/profile/devices`,
    visitor: `${API_BASE_URL}visitors`,
    apartments: `${API_BASE_URL}apartments`,
    notifications: `${API_BASE_URL}notifications`,
    users: `${API_BASE_URL}users`,
    signature: `${API_BASE_URL}core/s3signature?`,
    visitor_image: `${API_BASE_URL}core/base64upload?`
  }
};
export const DashboardData = [
  {
    path: 'VisitorList',
    iconName: 'people',
    name: 'Visitor List',
    icon: 'iconVl'
  },
  {
    path: 'Visitor',
    iconName: 'v-card',
    name: 'Visitor Entry',
    icon: 'iconViE'
  },
  {
    path: 'VenderEntry',
    iconName: VENDOR_IMG,
    name: 'Vendor Entry',
    icon: 'iconVeE'
  },
  {
    path: 'QRCode',
    iconName: 'qrcode',
    name: 'QR Code',
    icon: 'iconQR'
  }
];
