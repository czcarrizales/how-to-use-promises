// Promises: an object returned by an asynchronous function,
// which represents the current state of the operation.

const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  console.log(fetchPromise);
  
  fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
  });
  
  console.log("Started request…");

  // We call the fetch() api, and then assign the returned
  // value to the fetchPromise variable.
  // We then log the fetchPromise variable,
  // log the "Started request...", then (if the
  // operation succeeds), the promise will log the server
  // response.

  // When using Promises, the rest of the code will run, even
  // though we are still waiting for a response too.

  // You can also chain promises.

  const fetchPromiseChain = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  fetchPromiseChain
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].name);
    });

// You can also add error messages, in case the promise does
// throw an error.

const fetchPromiseCheck = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  fetchPromiseCheck
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data[0].name);
    });

// You can catch errors from promises if they fail, and
// choose what to do with these errors.

const fetchPromiseCatchError = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  fetchPromiseCatchError
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data[0].name);
    })
    .catch((error) => {
      console.error(`Could not get products: ${error}`);
    });

// Terminology To Know

// Pending: Promise is created, and we're waiting to see if
// it has succeeded or failed.

// Fulfilled: Async function has succeeded, so the then()
// handler is called.

// Rejected: Async functino has failed, so the catch()
// handler is called.

// You can combine multiple promises using Promise.all()
// Promise.all() fulfills when all the promises in the array
// are fulfilled. It takes an array of promises, and returns
// a single promise.

const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
  );
  const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  );
  
  Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => {
      for (const response of responses) {
        console.log(`${response.url}: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Failed to fetch: ${error}`);
    });

// You can use async/await to simplify Promises.
// It's way of writing async functions that look like
// synchronous code.

async function fetchProducts() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // after this line, our function will wait for the `response.json()` call to be settled
      // the `response.json()` call will either return the parsed JSON object or throw an error
      const data = await response.json();
      console.log(data[0].name);
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  
  fetchProducts();