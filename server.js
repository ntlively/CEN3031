var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;



//  This function handles all the incoming requests, it does the following:
//  + parses the url
//  + checks if the request is of method 'GET'
//  + checks if the request asks for the correct information '/listings'
//  + responds to a correct request with json data loaded on server creation
//  + responds to an incorrect request with 404 and Bad gateway error

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

  if(request.method == 'GET' && request.url =='/listings'){
    console.log('Correct Request Processing\n-- request.url =>', request.url, '\n');
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(listingData);
  }else{
    console.log('Incorrect Request Terminated\n-- request.url =>', request.url,'\n');
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Bad gateway error');
  }
};


//  When you start the server, this function:
//  + reads the contents of the specified json file
//  + throws an error if there is a problem reading the file
//  + sets the variable equal to the data from the file
//  + creates an http server that askes the requestHandler to handle any incoming requests

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

  if(err){
    throw err;
  }else{
    listingData = data;
  }

  http.createServer(function (request, response) {
    requestHandler(request, response);
  }).listen(8080);

  console.log('Server started\n');
});
