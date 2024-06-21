const express = require("express");
const router = express.Router();
const Item = require("../models/items");
const Topic = require("../models/topics");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
router.use(bodyParser.json());
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send("server error");
  }
});

router.get("/search", async (req, res) => {
  const { subjectName } = req.query;
  console.log("subjectname", subjectName);
  if (!subjectName) {
    return res.status(400).json({ msg: "Subject name is required" });
  }

  try {
    const items = await Item.find(
      {
        $or: [
          { "subjects.name1": subjectName },
          { "subjects.name2": subjectName },
          { "subjects.name3": subjectName },
          { "subjects.name4": subjectName },
        ],
      },
      "title"
    );
    res.json(items);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

const OPENAI_API_KEY = process.env.OPEN_API;

// router.post("/message", async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: userMessage }],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const assistantMessage = response.data.choices[0].message.content;
//     res.json({ reply: assistantMessage });
//   } catch (error) {
//     console.error("Error communicating with OpenAI API:", error);
//     res.status(500).json({ error: "Failed to fetch response from OpenAI API" });
//   }
// });
const abortControllers = {};

router.post("/message", async (req, res) => {
  const { message, requestId } = req.body;

  if (abortControllers[requestId]) {
    abortControllers[requestId].abort();
  }

  const controller = new AbortController();
  abortControllers[requestId] = controller;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }
    );

    const assistantMessage = response.data.choices[0].message.content;
    res.json({ reply: assistantMessage });
  } catch (error) {
    if (error.name === "AbortError") {
      res.status(499).json({ error: "Request aborted" });
    } else {
      console.error("Error communicating with OpenAI API:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch response from OpenAI API" });
    }
  } finally {
    delete abortControllers[requestId];
  }
});

router.post("/chat/stop", (req, res) => {
  const { requestId } = req.body;

  if (abortControllers[requestId]) {
    abortControllers[requestId].abort();
    delete abortControllers[requestId];
    res.status(200).json({ message: "Request aborted" });
  } else {
    res.status(400).json({ error: "Invalid requestId" });
  }
});

router.post("/topics", async (req, res) => {
  const { subject } = req.body;

  try {
    const topicsData = await Topic.find(
      { "subjects.subject": subject },
      { "subjects.$": 1 }
    );

    if (topicsData.length > 0) {
      const topics = topicsData[0].subjects[0].topics;
      res.json({ subject, topics });
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving topics", error });
  }
});

module.exports = router;
