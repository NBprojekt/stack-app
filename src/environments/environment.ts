// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    url: 'https://api.stackexchange.com/',
    version: '2.2/',
    key: 'tY6t1JhOUblLZKK7kLe1cA((',
  },
  oAuth: {
    clientId: 16712,
    redirectUrl: 'https://auth.stack.norbert-bartko.de/',
    scope: 'read_inbox,private_info,write_access',
  },
};
