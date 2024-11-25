/**
 * Pauses execution for the specified time in milliseconds.
 * 
 * @param {number} ms - The amount of time to wait in milliseconds.
 * @returns {Promise} - A promise that resolves after the specified time has elapsed.
 */
function sleep(ms) {
    // Returns a Promise that resolves after the specified delay (ms).
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retries the provided function in case of failure, with exponential backoff between retries.
 * 
 * This higher-order function will automatically retry the provided `fn` function
 * a set number of times if it throws an error, with an exponentially increasing delay 
 * between attempts. It helps to handle transient errors in asynchronous functions.
 * 
 * @param {Function} fn - The function to be retried in case of failure.
 * @param {number} retryCount - The maximum number of retry attempts (default is 3).
 * @param {number} baseDelay - The initial delay before the first retry, in milliseconds (default is 1000ms).
 * @returns {Function} - A function that when called, will execute `fn` and retry on failure.
 */
function retryFunction(fn, retryCount = 3, baseDelay = 1000) {
    // Returns a new function that wraps the `fn` function with retry logic
    return async function (...args) {
        let attempt = 0; // Keeps track of the number of attempts made

        // Loop to retry the function up to `retryCount` times
        while (attempt < retryCount) {
            try {
                // Try to execute the function with the provided arguments
                return await fn(...args);
            } catch (error) {
                // If the function throws an error, log it and attempt to retry
                attempt++;
                console.error(`Attempt ${attempt} failed: ${error.message}`);

                // If the maximum retry attempts have been reached, throw an error
                if (attempt >= retryCount) {
                    throw new Error('Maximum retry attempts reached');
                }

                // Exponentially back off: increase delay with each retry attempt
                // Delay calculation: baseDelay * 2^(attempt - 1)
                const delay = baseDelay * Math.pow(2, attempt - 1);
                console.log(`Waiting for ${delay}ms before retrying...`);

                // Wait for the calculated delay before retrying the function
                await sleep(delay);
            }
        }
    };
}

/**
 * An unreliable function that simulates failure with a given probability.
 * 
 * This function is designed to randomly fail based on the provided `probForFail`.
 * It's a useful example function for testing retry logic.
 * 
 * @param {number} probForFail - The probability (between 0 and 1) that the function will fail.
 * @returns {Promise} - Resolves with 'Success!' if it doesn't fail, or throws an error if it fails.
 */
async function unreliableFunction(probForFail) {
    // Generate a random number between 0 and 1
    const rand = Math.random();
    console.log(`Random value: ${rand}, Failure probability: ${probForFail}`);
    
    // Simulate failure if the random value is less than the specified failure probability
    if (rand < probForFail) {
        throw new Error('Random failure');
    }

    // If no failure, return success message
    return 'Success!';
}

/**
 * Creates a retryable version of the unreliable function.
 * 
 * This is a higher-order function that wraps `unreliableFunction` with retry logic,
 * meaning it will retry the function up to 5 times with exponential backoff if it fails.
 */
const retryableFunction = retryFunction(unreliableFunction, 5, 1000);

/**
 * Trigger the retryable function, passing in a probability of failure.
 * 
 * In this example, we're passing `0.5`, meaning the function has a 50% chance of failure.
 * The function will automatically retry up to 5 times if it fails.
 */
retryableFunction(0.5)
    .then(result => {
        // If the function succeeds, log the result
        console.log('Final result:', result);
    })
    .catch(error => {
        // If the function fails after all retries, log the final error message
        console.error('Final error:', error.message);
    });
