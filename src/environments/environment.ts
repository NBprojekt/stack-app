// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    url: 'https://api.stackexchange.com/',
    version: '2.2/',
    key: 'jWSRC3OcNKkruEKS7lLZkQ((',
  },
  oAuth: {
    clientId: 16531,
    redirectUrl: 'http://localhost/',
    scope: 'read_inbox,private_info,write_access',
  },
};
