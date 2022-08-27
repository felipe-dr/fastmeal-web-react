import config from './config';

const localStorage = {
  USER: `${config.APP_PREFIX}.user`,
};

export default Object.freeze(localStorage);
