import { CityInterface } from 'src/app/shared/types/city.interface';
export interface EnvironmentInterface {
  production: boolean;
  api: string;
  defaultLocation?: CityInterface;
}
