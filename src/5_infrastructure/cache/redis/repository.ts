import { createClient, RedisClientType } from "redis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

export class RedisRepository {
  private static client: RedisClientType = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  });

  static {
    RedisRepository.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });
  }

  constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
    if (!RedisRepository.client.isOpen) {
      await RedisRepository.client.connect();
    }
  }

  public static async disconnect(): Promise<void> {
    if (RedisRepository.client.isOpen) {
      await RedisRepository.client.quit();
    }
  }

  get = async (key: string): Promise<any[] | null> => {
    try {
      const fullList = await RedisRepository.client.get(key);

      if (!fullList) {
        return null;
      }

      return JSON.parse(fullList);
    } catch (error) {
      console.error("Error fetching list range:", error);

      throw error;
    }
  };

  set = async <T>(key: string, value: T, ttl: number = 3600): Promise<void> => {
    try {
      await RedisRepository.client.set(key, JSON.stringify(value), {
        EX: ttl,
      });
    } catch (error) {
      console.error("Error setting value in Redis:", error);

      throw error;
    }
  };

  flushAll = async (): Promise<void> => {
    try {
      await RedisRepository.client.flushAll();
    } catch (error) {
      console.error("Error flushing Redis:", error);

      throw error;
    }
  };
}
