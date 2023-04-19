const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer();

server.on('request', (req, res) => {

  switch (req.method) {
    case 'POST':
      // create the files directory if it does not exist
      if (!fs.existsSync('files')) {
        fs.mkdirSync('files');
      }
        // create a new file
        const content = 'This is my file';
      if(fs.existsSync('./files/text.txt')){
        res.statusCode = 409;
        res.end('File already exists');
      }
        fs.writeFile('./files/text.txt', content, (err) => {
          if (err) {
            // handle network error
            console.error(err);
            // delete file if it was created
            res.statusCode = 500;
            res.end('Internal Server Error');
          } else {
            res.statusCode = 201;
            res.end('File created');
          }
        });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
