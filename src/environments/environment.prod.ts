import { EnvironmentInterface } from 'src/app/shared/types/environment.interface';

export const environment: EnvironmentInterface = {
  production: false,
  api: '/',
  // todo: потом убрать
  defaultLocation: {
    id: 1122,
    ur_id: 1120,
    name: 'Москва',
    latitude: 55.75322,
    longtitude: 37.622513,
  },
};
