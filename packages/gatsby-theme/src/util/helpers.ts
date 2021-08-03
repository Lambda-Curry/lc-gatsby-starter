import { ENV } from './constants';

export const isBrowser = () => typeof window !== 'undefined';

export const isDevelopmentEnv = () => ENV === 'development';

export const isProductionEnv = () => ENV === 'production';
