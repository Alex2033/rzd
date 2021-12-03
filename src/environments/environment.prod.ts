import { EnvironmentInterface } from 'src/app/shared/types/environment.interface';

/* TEST */
const testLocation = {
  id: 1101,
  ur_id: 1082,
  name: 'Moscow',
  latitude: 55.7539,
  longtitude: 37.6358,
};

/* PROD */
const prodLocation = {
  id: 1122,
  ur_id: 1120,
  name: 'Moscow',
  latitude: 55.75322,
  longtitude: 37.622513,
};

export const environment: EnvironmentInterface = {
  production: false,
  api: '/',
  isProdMode: true,
};

export const defaultLocation = environment.isProdMode
  ? { ...prodLocation }
  : { ...testLocation };
