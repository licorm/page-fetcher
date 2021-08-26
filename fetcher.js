//require 
const request = require('request');
const fs = require('fs');
const readline = require('readline');

//command line arguments
const URL = process.argv[2].toString();
const file = process.argv[3].toString();


//request
request(URL, (error, response, body) => {
  if (error) {
    console.log('The URL you have submitted is invalid');
    return;
  } // if error occurs, let user know and terminate process

  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  //checks if file exists
  fs.access(file, fs.F_OK, err => {
    //if file exists, it will tell you it exists and ask you to overwrite it or exit program
    if (!err) {
      console.log('The file exists')
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
       rl.question("File already exists, if you would like to overwrite file press Y, otherwise app will exit.", (answer) => {
         if (answer === 'y') {
           fs.writeFile(file, body, err => {
             if (err) {
               console.err(err)
               return;
             }
             console.log(`Downloaded and saved ${body.length} bytes to ${file}`)
           })
         }
         rl.close();
         return;
       })
       return;
    } 
    //called when file does not exist, creates file, writes to it and saves it then console.logs that it was written
    fs.writeFile(file, body, err => {
      if (err) {
        console.err(err)
        return;
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${file}`)
    })
  })
});

