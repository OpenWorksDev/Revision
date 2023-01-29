import rateLimit from "../../components/api/rate-limit";
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 100, // Max 100 users per second
});
export default async function Flake(req, res) {
  console.log(req.headers["cf-connecting-ip"] || req.connection.remoteAddress);
  try {
    await limiter.check(
      res,
      10,
      req.headers["CF-Connecting-IP"] || req.connection.remoteAddress
    ); // 10 requests per minute (interval)
    res.status(200).send({ msg: "pong" });
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}
