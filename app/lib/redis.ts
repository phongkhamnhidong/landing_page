import { createClient } from "redis"

const globalForRedis = global as unknown as { redisClient?: ReturnType<typeof createClient> }

function getClient() {
  if (!globalForRedis.redisClient) {
    globalForRedis.redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 2000,
        reconnectStrategy: (retries) => (retries > 2 ? new Error("Redis unavailable") : retries * 200),
      },
    })
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
