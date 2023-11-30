import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient()

client.on('error', err => console.log('Redis client not connected to the server: ', err))

client.on('connect', () => {
      console.log('Redis client connected to the server')
  });

// Function to set a new school in Redis
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, print);
};

// Function to display the value for a school in Redis using async/await
const displaySchoolValue = async (schoolName) => {
  const getAsync = promisify(client.get).bind(client);
  try {
    const reply = await getAsync(schoolName);
    console.log(reply);
  } catch (err) {
    console.error(`Error getting value for ${schoolName}: ${err.message}`);
  }
};

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
