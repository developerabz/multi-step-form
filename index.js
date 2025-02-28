import express from 'express';
// import { readFileSync } from 'node:fs';
import cors from 'cors';

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())
app.use(express.static('frontend'))


app.get('/api/works', (req, res) => {
  const obj = {
    yo: 0,
    grow: "two"
  }

  const jObj = JSON.stringify(obj);
  console.log(jObj);

  res.send(jObj);
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
