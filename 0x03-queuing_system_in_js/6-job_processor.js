// Import required modules
import kue from 'kue';

// Create a Kue queue named push_notification_code
const queue = kue.createQueue();

// Function to send a notification
const sendNotification = (phoneNumber, message) => {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

// Process the queue for jobs in the "push_notification_code" queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function with the job data
  sendNotification(phoneNumber, message);

  // Mark the job as completed
  done();
});

// Event listener for successful queue processing
queue.on('job complete', (id, result) => {
  console.log(`Job ${id} completed`);
});

// Event listener for queue errors
queue.on('error', (err) => {
  console.error(`Queue error: ${err}`);
});

console.log('Job processor is running...');
