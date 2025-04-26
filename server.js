import express from 'express';

const server = express();

// server.get('/*', (req, res) => {
//   res.sendFile('index.html', { root: '.' });
// });

// server.get('/api/data', (req, res) => {
//   res.send();
// });

server.use(express.static('.'));

server.listen(3000, () => {
  console.log('ready');
});
