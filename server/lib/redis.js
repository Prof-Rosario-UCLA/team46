import { createClient } from 'redis';

const client = createClient({ url: process.env.REDIS_URL });
client.connect().catch(console.error);   // keep process alive even if redis is down

export default client;