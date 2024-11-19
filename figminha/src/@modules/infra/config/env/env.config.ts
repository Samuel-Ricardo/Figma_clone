export const ENV = {
  ...process.env,

  LIVE_BLOCK: {
    API: {
      KEY: process.env.NEXT_PUBLIC_LIVE_BLOCK_PUBLIC_API_KEY,
    },
  },
};
