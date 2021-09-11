import { EnvironmentInterface } from 'src/app/shared/types/environment.interface';

export const environment: EnvironmentInterface = {
  production: false,
  api: '/',

  /* TEST */
  // defaultLocation: {
  //   id: 1101,
  //   ur_id: 1082,
  //   name: 'Москва',
  //   latitude: 55.7539,
  //   longtitude: 37.6358,
  // },

  /* PROD */
  defaultLocation: {
    id: 1122,
    ur_id: 1120,
    name: 'Москва',
    latitude: 55.75322,
    longtitude: 37.622513,
  },
};
