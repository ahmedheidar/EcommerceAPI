import { Router } from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import Jwt from "jsonwebtoken";

const router = Router();
dotenv.config();

// register
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    });
    console.log(user);

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }

}
);

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong password or email!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (OriginalPassword !== req.body.password) {
            res.status(401).json("Wrong password or email!");
        } else {
            const { password, ...others } = user._doc;
            
            const accessToken = Jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRETKEY, { expiresIn: "1d" });
            res.status(200).json({...others, accessToken});
        }

    } catch (err) {
        res.status(500).json(err);
    }
}
);


export default router;