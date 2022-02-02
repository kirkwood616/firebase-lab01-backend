import { getClient } from "../db";
import express from "express";
import { ObjectId } from "mongodb";
import ShoutOut from "../models/ShoutOuts";

const shoutRoutes = express.Router();

// GET
shoutRoutes.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<ShoutOut>("shoutOuts")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET BY ID
shoutRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const item = await client
      .db()
      .collection<ShoutOut>("shoutOuts")
      .findOne({ _id: new ObjectId(id) });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "ID Not Found" });
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST
shoutRoutes.post("/", async (req, res) => {
  const item = req.body as ShoutOut;
  try {
    const client = await getClient();
    await client.db().collection<ShoutOut>("shoutOuts").insertOne(item);
    res.status(201).json(item);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT
shoutRoutes.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body as ShoutOut;
  delete data._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<ShoutOut>("shoutOuts")
      .replaceOne({ _id: new ObjectId(id) }, data);
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "ID Not Found" });
    } else {
      data._id = new ObjectId(id);
      res.json(data);
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE
shoutRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<ShoutOut>("shoutOuts")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "ID Not Found" });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default shoutRoutes;
