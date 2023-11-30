// Import required modules
import redis from 'redis';

// Create a Redis subscriber client
const subscriberClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

// Event listener for successful connection
subscriberClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener for connection errors
subscriberClient.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the "holberton school channel"
subscriberClient.subscribe('holberton school channel');

// Event listener for incoming messages on the subscribed channel
subscriberClient.on('message', (channel, message) => {
  console.log(message);

  // Unsubscribe and quit if the message is "KILL_SERVER"
  if (message === 'KILL_SERVER') {
    subscriberClient.unsubscribe('holberton school channel');
    subscriberClient.quit();
  }
});
