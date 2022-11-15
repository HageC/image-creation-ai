import express from "express";
import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";
import errorHandler from "./error-handler.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const app = express();
const port = process.env.PORT || 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));

//app.use(express.static(path.resolve("./client/build")));

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

// app.get("*", (req,res)=>{
//   res.sendFile(path.resolve("./client/build", "index.html"))
// })

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
