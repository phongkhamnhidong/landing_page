import { createClient } from "redis"

const globalForRedis = global as unknown as { redisClient?: ReturnType<typeof createClient> }

function getClient() {
  if (!globalForRedis.redisClient) {
    globalForRedis.redisClient = createClient({ url: process.env.REDIS_URL })
    globalForRedis.redisClient.on("error", (err) => console.error("Redis error:", err))
  }
  return globalForRedis.redisClient
}

export async function redis() {
  const client = getClient()
  if (!client.isOpen) {
    await client.connect()
  }
  return client
}
