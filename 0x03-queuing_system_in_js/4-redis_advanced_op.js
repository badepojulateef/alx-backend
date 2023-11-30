// Import required modules
import redis from 'redis';

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

// Event listener for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener for connection errors
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to create a hash in Redis
const createHash = () => {
  client.hset(
    'HolbertonSchools',
    'Portland',
    '50',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Seattle',
    '80',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'New York',
    '20',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Bogota',
    '20',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Cali',
    '40',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Paris',
    '2',
    redis.print
  );
};

// Function to display the hash stored in Redis
const displayHash = () => {
  client.hgetall('HolbertonSchools', (err, reply) => {
    if (err) {
      console.error(`Error getting hash: ${err.message}`);
    } else {
      console.log(reply);
    }
  });
};

// Call the functions
createHash();
displayHash();
