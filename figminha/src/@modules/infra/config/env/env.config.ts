export const ENV = {
  ...process.env,

  LIVE_BLOCK: {
    API: {
      KEY: process.env.LIVE_BLOCK_API_KEY,
    },
  },
};
