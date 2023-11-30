import chai from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

const { expect } = chai;

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    // Create a Kue queue and enter test mode
    queue = kue.createQueue({ disableSearch: true, jobEvents: false });
    queue.testMode.enter();
  });

  afterEach(() => {
    // Clear the queue and exit test mode
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    const invalidCall = () => createPushNotificationsJobs('invalid', queue);
    expect(invalidCall).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234' },
      { phoneNumber: '4153518781', message: 'This is the code 5678' },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Validate that two jobs are in the queue
    const jobsInQueue = queue.testMode.jobs;
    expect(jobsInQueue.length).to.equal(2);

    // Validate that the jobs have the correct data
    expect(jobsInQueue[0].type).to.equal('push_notification_code_3');
    expect(jobsInQueue[0].data).to.deep.equal(jobs[0]);

    expect(jobsInQueue[1].type).to.equal('push_notification_code_3');
    expect(jobsInQueue[1].data).to.deep.equal(jobs[1]);
  });
});
