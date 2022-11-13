import express from "express";
import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";
import errorHandler from "./error-handler.js";
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/create", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: "Please enter a prompt." });
  }

  const response = await openai.createImage({
    prompt,
    n: 4,
    size: "1024x1024",
  });

  const { data } = response.data;

  res.status(200).json({ data });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
