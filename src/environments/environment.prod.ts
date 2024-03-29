export const environment = {
  production: true,
  api: {
    url: 'https://api.stackexchange.com/',
    version: '2.2/',
    key: 'tY6t1JhOUblLZKK7kLe1cA((',
    updateSitesIntervall: 3,
    updateNotificationsIntervall: 2,
  },
  oAuth: {
    clientId: 16712,
    redirectUrl: 'https://auth.stack.norbert-bartko.de/',
    scope: 'read_inbox,private_info,write_access,no_expiry',
  },
};
