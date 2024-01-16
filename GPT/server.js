const express = require("express");
const multer = require("multer");
const openai = require("openai");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

openai.apiKey = "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";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file || !req.body.question) {
    return res.status(400).send("Invalid request");
  }

  const pdfText = req.file.buffer.toString("utf8");
  const question = req.body.question;
  const prompt = `Document: ${pdfText}\nQuestion: ${question}\nAnswer:`;

  openai.Completion.create({
    engine: "text-davinci-002",
    prompt: prompt,
    max_tokens: 150,
    n: 1,
    stop: null,
  })
    .then((response) => {
      const answer = response.choices[0].text.trim();
      res.json({ answer });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = app;
