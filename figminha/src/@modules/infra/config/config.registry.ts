export const CONFIG_REGISTRY = {
  CONFIG: Symbol.for('MODULE::INFRA::CONFIG'),
  ENV: Symbol.for('MODULE::INFRA::CONFIG::ENV'),
  CONST: Symbol.for('MODULE::INFRA::CONFIG::CONST'),
  LIVE_BLOCK: {
    API: {
      KEY: Symbol.for('MODULE::INFRA::CONFIG::LIVE_BLOCK::API::KEY'),
    },
  },
};
