import { environment } from 'src/environments/environment.prod';

export const captchaKey: string = environment.isProdMode
  ? '6LcFviEeAAAAAMt39LLqIAyhCjkQiJdUVXS-pYrt'
  : '6LePuyEeAAAAACXzCR2WmAFWsU2shpCW_oz18iqd';
