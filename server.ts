import * as express from 'express';
import * as xml from 'xml'

const app = express();
const port = 3000;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library

app.all('*', (req, res) => {
  const method = req.method;
  const path = req.path;
  const query = req.query;
  const headers = req.headers;
  const body = req.body;
  const all = { method, path, query, headers, body };
  switch (req.headers.accept) {
    case 'application/json':
      res.json(all);
      break;
    case 'application/xml':
      res.set('content-type', 'application/xml');
      res.send(xml({ root: [all] }));
      break;
    case 'text/html':
      res.set('content-type', 'text/html');
      res.send(xml({ root: [all] }));
      break;
    default:
      res.send(`Method: ${method}, Path: ${path}, Query: ${JSON.stringify(query)}, Headers: ${JSON.stringify(headers)}, Body: ${JSON.stringify(body)}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
