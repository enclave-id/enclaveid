import Redis, { RedisOptions } from 'ioredis';

const redisOptions: RedisOptions = {
  host:
    process.env.REDIS_HOST ||
    'enclaveid-redis-master.default.svc.cluster.local',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

export const redis = new Redis(redisOptions);
