import { Container } from 'inversify';
import { CONFIG_REGISTRY } from './config.registry';
import { CONFIG } from './app/app.config';

import lazy from 'inversify-inject-decorators';

export const CONFIG_MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

CONFIG_MODULE.bind(CONFIG_REGISTRY.CONFIG).toConstantValue(CONFIG);
CONFIG_MODULE.bind(CONFIG_REGISTRY.ENV).toConstantValue(CONFIG.ENV);
CONFIG_MODULE.bind(CONFIG_REGISTRY.CONST).toConstantValue(CONFIG.CONST);

CONFIG_MODULE.bind(CONFIG_REGISTRY.LIVE_BLOCK.API.KEY).toConstantValue(
  CONFIG.ENV.LIVE_BLOCK.API.KEY,
);

export const { lazyInject: injectConfig } = lazy(CONFIG_MODULE);
