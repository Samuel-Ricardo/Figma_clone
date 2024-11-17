import { Container } from 'inversify';
import { INFRA_MODULE } from './infra/infra.module';

const _MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export const APP_MODULE = Container.merge(_MODULE, INFRA_MODULE);
