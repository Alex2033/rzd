// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.

import { EnvironmentInterface } from 'src/app/shared/types/environment.interface';

// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentInterface = {
  production: false,
  api: 'http://87.242.76.45:8080/',
  // todo: потом убрать
  defaultLocation: {
    id: 1101,
    ur_id: 1082,
    name: 'Москва',
    latitude: 55.7539,
    longtitude: 37.6358,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
