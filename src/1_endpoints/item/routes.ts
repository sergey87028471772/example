import { Router } from "express";

import { ItemController } from "~2_adapters";

import { asyncWrapper } from "~4_lib";

import { validateGetItems, validatePostItems } from "./lib";

const router = Router();

const itemsController = new ItemController();

/**
 * @swagger
 * /set:
 *   get:
 *     summary: Set items in the database and cache
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Successfully set items
 *       500:
 *         description: Internal server error
 */
router.get("/set", asyncWrapper(itemsController.setItems));

/**
 * @swagger
 * /get:
 *   get:
 *     summary: Get items from the database or cache
 *     tags:
 *       - Items
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Limit the number of items to return
 *         required: false
 *         schema:
 *           type: integer
 *       - name: offset
 *         in: query
 *         description: Skip the first N items
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved items
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.get("/get", validateGetItems, asyncWrapper(itemsController.getItems));

/**
 * @swagger
 * /buy:
 *   post:
 *     summary: Purchase items
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Name of the user
 *               purchaseItems:
 *                 type: array
 *                 description: List of items to purchase
 *                 items:
 *                   type: object
 *                   properties:
 *                     marketHashName:
 *                       type: string
 *                     count:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Successfully purchased items
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/buy", validatePostItems, asyncWrapper(itemsController.buyItems));

export default router;
