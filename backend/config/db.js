const {createClient} = require("redis");

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis(){
    if(!client.isOpen){
        await client.connect();
    }
    console.log("connected to redis successfully!");
}

connectRedis();
module.exports = client;