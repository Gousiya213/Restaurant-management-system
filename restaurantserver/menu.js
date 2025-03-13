import dotenv from 'dotenv';
import { Router } from 'express';
import express from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { Menu } from './db.js';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const MenuRouter = Router();
const app = express();
app.use(express.json());

MenuRouter.post('/additem', async (req, res) => {
    const requiredBody = z.object({
        name: z.string(),
        price: z.number().int(),
        image: z.string(),
        description: z.string(),
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: parsedBody.error.errors
        });
    }

    const { name, price, image, description } = req.body;
    try {
        await Menu.create({
            name,
            price,
            image,
            description,
        });

        res.status(201).json({ message: 'Menu Item Added Successfully' });

    } catch (e) {
        console.error("Menu Add Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
MenuRouter.get('/allitems', async (req, res) => {
    try {
        const allMenuItems = await Menu.find();
        res.status(200).json(allMenuItems);
    } catch (e) {
        console.error("Menu Fetch Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
MenuRouter.post('/deleteitem', async (req, res) => {
    const requiredBody = z.object({
        name: z.string(),
        price: z.number().int(),
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: parsedBody.error.errors
        });
    }

    const { name, price } = req.body;
    try {
        const deletedItem = await Menu.findOneAndDelete({ name, price });

        if (!deletedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ message: 'Menu Item Deleted Successfully' });

    } catch (e) {
        console.error("Menu Delete Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export default MenuRouter;