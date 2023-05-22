import { Redis } from "@upstash/redis";
import https from "https";

const redis = Redis.fromEnv({
  agent: new https.Agent({ keepAlive: true }),
});

export default async function Stats() {
  const stats = (await redis.get("stats")) as {
    id: number;
    name: string;
    value: number;
  }[];

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-zinc-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
