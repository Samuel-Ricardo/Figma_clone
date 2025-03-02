import { MODULES } from '@/@modules/app.factory';

export const generateRandomNames = () => {
  const { ADJECTIVES, ANIMALS } = MODULES.INFRA.CONFIG.CONST().NAMES;

  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];

  return `${adjective} ${animal}`;
};
