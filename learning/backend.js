// // 1.setup
// const xhr = new XMLHttpRequest(); // buit in class XMLHttpRequest()
//     //here its asynchronous code so we set the event listener wait for the response then run the code inside the function
// xhr.addEventListener( 'load' , () => {
//   console.log(xhr.response); //----->print the response got from the backend
// });

// // 2.type of response and URL
// xhr.open('GET', 'https://supersimplebackend.dev');

// // 3.send
// xhr.send();


// //the steps above are how we send the http request to backedn abd get the response so we can save it variable or do updation we wanta
// // chatgpt ----->These steps show how we send an HTTP request to a backend and get the response asynchronously.
// //               Once the response arrives, the 'load' event runs and we can access xhr.response to update the UI or save the data.




// -------read above---------


// 1.setup
const xhr = new XMLHttpRequest(); // buit in class XMLHttpRequest()
    //here its asynchronous code so we set the event listener wait for the response then run the code inside the function
xhr.addEventListener( 'load' , () => {
  console.log(xhr.response); //----->print the response got from the backend
});

// 2.type of response and URL
xhr.open('GET', 'https://supersimplebackend.dev/hello');

// 3.send
xhr.send();


