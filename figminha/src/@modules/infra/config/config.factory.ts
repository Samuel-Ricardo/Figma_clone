import { Config } from '@/@types/infra/config/config.type';
import { CONFIG_MODULE } from './config.module';
import { CONFIG_REGISTRY } from './config.registry';
import { EnvConfig } from '@/@types/infra/config/env.type';
import { CONSTS } from '@/@types/infra/config/const.type';

export const CONFIG_FACTORY = {
  CONFIG: () => CONFIG_MODULE.get<Config>(CONFIG_REGISTRY.CONFIG),
  ENV: () => CONFIG_MODULE.get<EnvConfig>(CONFIG_REGISTRY.ENV),
  CONST: () => CONFIG_MODULE.get<CONSTS>(CONFIG_REGISTRY.CONST),
  LIVE_BLOCK: {
    API: {
      KEY: CONFIG_MODULE.get<string>(CONFIG_REGISTRY.LIVE_BLOCK.API.KEY),
    },
  },
};
