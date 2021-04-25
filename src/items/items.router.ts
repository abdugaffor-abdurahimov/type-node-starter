import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

const itemsRouter = express.Router();

// GET items
itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();

    res.status(200).send(items);
  } catch (error) {
    res.status(2000).send(error.message);
  }
});

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.find(id);

    if (item) {
      return res.status(200).send(item);
    }
    res.status(404).send("Item not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    const newItem = await ItemService.create(item);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

itemsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdated: Item = req.body;

    const existingItem: Item = await ItemService.find(id);

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdated);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemService.create(itemUpdated);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

itemsRouter.delete("/id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);

    await ItemService.remove(id);

    res.send(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default itemsRouter;
