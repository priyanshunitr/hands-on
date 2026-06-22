import Redis from "ioredis";

const sub = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

sub.subscribe("my_channel", (err, count) => {
    if (err) {
        console.error("Failed to subscribe: ", err);
    }else{
        console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
    }
});

sub.on("message", (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`);
    console.log("message:", JSON.parse(message))
});