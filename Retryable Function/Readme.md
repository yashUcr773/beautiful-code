# Retryable Function with Exponential Backoff

This project provides a simple implementation of a retryable function using exponential backoff. The function will attempt to execute a given task and, in case of failure, will retry the task a specified number of times, with an exponentially increasing delay between each attempt.

## Features

- **Exponential backoff**: The delay between retries increases exponentially, reducing the load on external systems in case of transient errors.
- **Retry logic**: Automatically retries a function up to a specified number of attempts.
- **Customizable retry count and delay**: You can configure the number of retry attempts and the initial delay before the first retry.

## Usage

### sleep(ms)

This helper function pauses the execution for a given number of milliseconds. It returns a `Promise` that resolves after the specified delay.

- **Arguments**: 
  - `ms`: The amount of time (in milliseconds) to wait.
  
- **Returns**: A `Promise` that resolves after the specified time.

### retryFunction(fn, retryCount, baseDelay)

This function wraps any asynchronous function `fn` with retry logic. If `fn` fails, it will retry the function up to `retryCount` times, with an exponentially increasing delay between attempts.

- **Arguments**: 
  - `fn`: The function to retry, which must return a `Promise`.
  - `retryCount` (optional): The maximum number of retry attempts. Default is `3`.
  - `baseDelay` (optional): The initial delay in milliseconds before the first retry. Default is `1000ms`.

- **Returns**: A new function that when invoked, executes `fn` with retry logic.

### unreliableFunction(probForFail)

This is an example function that simulates failure with a given probability. It randomly throws an error based on the provided `probForFail` value.

- **Arguments**:
  - `probForFail`: The probability (between `0` and `1`) that the function will fail. For example, `0.5` means there is a 50% chance of failure.
  
- **Returns**: A `Promise` that either resolves with `"Success!"` or throws an error with the message `"Random failure"`.

### Creating a Retryable Function

You can use `retryFunction` to create a retryable version of any function. This enables automatic retries with exponential backoff for functions that might fail due to transient errors.

### Triggering the Retryable Function

Once you've created a retryable function, you can trigger it by calling it with the necessary arguments. The function will automatically handle retries and backoff if it fails.

## Use Cases

1. API Requests with Intermittent Failures
   - Many web APIs, especially third-party services, can experience intermittent failures due to server overload, network issues, or temporary outages. This retryable function can be used to handle transient API errors (such as 500 Internal Server Errors or timeouts) by retrying the request a few times before giving up. The exponential backoff ensures that the retries are spaced out, reducing the load on the server.

   - Example: A weather API that may return an error when server traffic is high. Instead of failing immediately, your app retries the request with increasing delays between attempts.

2. Database Connection Retry Logic
    - When dealing with databases, connections can sometimes fail due to network issues, server overload, or maintenance. By using the retryable function, database queries or connections can be retried automatically with increasing delays, improving resilience in situations where temporary issues occur.

    - Example: A cloud database that occasionally experiences latency or timeouts. The function retries the connection a few times before throwing an error, ensuring a smoother user experience.

3. Payment Gateway Integration
    - Payment gateway integrations may fail due to various reasons like temporary network issues or server-side problems. In these cases, retrying the transaction request with an increasing delay can improve success rates without overloading the gateway with repeated rapid requests.

    - Example: A payment processing system where transactions fail due to momentary issues like network drops. The system retries the transaction a few times with exponential backoff, improving the likelihood of success.

4. File Uploads or Downloads with Unstable Network
    - When uploading or downloading files, especially large ones, a network failure could disrupt the operation. The retryable function can be used to automatically retry uploads or downloads in case of network failures or timeouts, with an increasing delay between attempts to avoid overwhelming the network or the server.

    - Example: Uploading a large file to a cloud storage service. If the connection is lost, the function will retry the upload up to a set number of times, with an increasing delay between retries to avoid network congestion.
  
5. Distributed Systems and Microservices
    - In distributed systems, communication between microservices may fail due to network partitions or temporary downtime of some services. This retryable function can be used to handle those failures gracefully, retrying the communication with increasing delay to reduce the risk of overwhelming the system during recovery.

    - Example: A microservice that communicates with an external payment service. If the payment service is temporarily unavailable, the microservice can retry the request with backoff instead of failing immediately.
  
6. Rate-Limited Services
    - Some services impose rate limits to prevent abuse. If you exceed the limit, the service may respond with a 429 Too Many Requests error. Instead of failing, your app can retry the request with an exponentially increasing delay until the rate limit is reset.

    - Example: A social media API that limits the number of requests per minute. If you exceed the limit, the retry logic waits for an increasing amount of time before retrying, allowing your app to comply with rate limits.
  
7. IoT Device Communication
    - In Internet of Things (IoT) applications, devices may occasionally lose connectivity, especially in remote or low-connectivity areas. The retryable function can be used to resend data to IoT devices or retry communication with them in case of temporary failures, ensuring reliable communication without overwhelming the system with retries.

    - Example: A temperature sensor device that sends data to a central server. If communication fails due to network instability, the system will retry the request with exponential backoff to avoid congestion.
  
8. Backup Systems
    - In backup systems, data might fail to be backed up due to network issues or temporary server unavailability. With exponential backoff, retries can be scheduled at increasing intervals, ensuring that the backup system tries again without causing unnecessary load on the server.

    - Example: A backup process for a large file storage system where occasional network hiccups can cause failures. The retry logic ensures the system retries the backup a few times with increasing delays, without overloading the backup system.
  
9. Sending Emails
    - When sending emails, especially in bulk, temporary issues such as email service downtimes or rate-limiting can cause failures. The retryable function can automatically retry sending emails with increasing delays, improving the chance of success without overwhelming the email service.

    - Example: Sending a promotional email to a large number of users. If an email fails due to service downtime or rate-limiting, the function will retry the send request a few times with increasing intervals between retries.
  
10. Job Queue Processing
    - In job queues, tasks may fail temporarily due to resource availability, network issues, or contention. Using retry logic ensures that tasks are retried and eventually processed, even if they fail initially due to transient issues.

    - Example: Processing jobs in a queue where workers occasionally fail due to resource limitations (e.g., CPU or memory). The retry logic will ensure that failed jobs are retried, giving the system time to stabilize.
