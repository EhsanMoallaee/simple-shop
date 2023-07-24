const redisDB =require('redis');
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log('Connect to Redis'));
redisClient.on("error", (err) => console.log('Redis error: ', err));
redisClient.on("ready", () => console.log('Redis connected successfully and ready to use...'));
redisClient.on("end", () => console.log('Redis disconnected successfully'));

module.exports = redisClient;