import { createClient, print } from 'redis';

const client = createClient()

client.on('error', err => console.log('Redis client not connected to the server: ', err))

client.on('connect', () => {
      console.log('Redis client connected to the server')
  });

// Function to set a new school in Redis
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, print);
};

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(`Error getting value for ${schoolName}: ${err.message}`);
    } else {
      console.log(reply);
    }
  });
};

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
