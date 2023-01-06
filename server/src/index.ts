import express, { Response, Request } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const PORT = 5000;

const app = express();

app.use(express.json()); // everytime someone makes requests to our API, it is going to run whatever function inside of 'use'. express.json() parses JSON Post Requests

app.post("/decks", async (req: Request, res: Response) => {
    console.log(req.body)
  const newDeck = new Deck({
    title: req.body.title,
  });

  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.get("/", (req: Request, res: Response) => {
  res.send("this is a response message");
});

app.get("/tgif", (req: Request, res: Response) => {
  res.send("tgif");
});

mongoose
  .connect(
    "mongodb+srv://flashcarduser:jMXFpsILge4Uj3Ly@cluster0.8cbtoaj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });
