import express from "express";
import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/create", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
