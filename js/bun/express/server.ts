// bun add express
import express from 'express';

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello " + process.env.WORLD);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
