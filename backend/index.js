const express = require('express');
const app = express();
const port = 3000; // You can use any port

// Define a simple route for the root URL
app.get('/', (req,res)=>{
    res.send("Hello")
}
);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Listening at ${3000}`);
});