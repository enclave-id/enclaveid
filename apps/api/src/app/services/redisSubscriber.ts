import Redis from 'ioredis';

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'enclaveid-redis',
  port: parseInt(process.env.REDIS_PORT) || 6379,
});
