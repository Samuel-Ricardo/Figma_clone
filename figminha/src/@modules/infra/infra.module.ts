import { Container } from 'inversify';
import { CONFIG_MODULE } from './config/config.module';

const _MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export const INFRA_MODULE = Container.merge(_MODULE, CONFIG_MODULE);
