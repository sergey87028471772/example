import { createClient, RedisClientType } from "redis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

export class RedisRepository {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    });

    this.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });
  }

  private async connect(): Promise<void> {
    await this.client.connect();
  }

  private async disconnect(): Promise<void> {
    await this.client.quit();
  }

  get = async (key: string): Promise<any[] | null> => {
    try {
      await this.connect();

      const fullList = await this.client.get(key);

      if (!fullList) {
        return null;
      }

      const data = JSON.parse(fullList);

      return data;
    } catch (error) {
      console.error("Error fetching list range:", error);

      throw error;
    } finally {
      await this.disconnect();
    }
  };

  set = async <T>(key: string, value: T, ttl: number = 3600): Promise<void> => {
    try {
      await this.connect();

      await this.client.set(key, JSON.stringify(value), {
        EX: ttl,
      });
    } catch (error) {
      console.error("Error setting value in Redis:", error);

      throw error;
    } finally {
      await this.disconnect();
    }
  };

  flushAll = async (): Promise<void> => {
    try {
      await this.connect();

      await this.client.flushAll();
    } catch (error) {
      console.error("Error flushing Redis:", error);

      throw error;
    } finally {
      await this.disconnect();
    }
  };
}
