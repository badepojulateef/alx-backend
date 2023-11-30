// Import required modules
import kue from 'kue';

// Create a Kue queue named push_notification_code
const queue = kue.createQueue();

// Create an object containing the job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification!',
};

// Create a job in the queue
const job = queue.create('push_notification_code', jobData);

// Event listener for successful job creation
job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
});

// Event listener for job completion
job.on('complete', () => {
  console.log('Notification job completed');
  // Remove the job from the queue when it's completed
  job.remove(() => {
    console.log(`Job ${job.id} removed from queue`);
    // Close the queue connection
    queue.shutdown(5000, () => {
      console.log('Queue shutdown');
    });
  });
});

// Event listener for job failure
job.on('failed', (err) => {
  console.log(`Notification job failed: ${err}`);
  // Remove the job from the queue when it fails
  job.remove(() => {
    console.log(`Job ${job.id} removed from queue`);
    // Close the queue connection
    queue.shutdown(5000, () => {
      console.log('Queue shutdown');
    });
  });
});

// Save the job to the queue
job.save();

// Note: Nothing else will happen until you process the job, which is done in the next step.
