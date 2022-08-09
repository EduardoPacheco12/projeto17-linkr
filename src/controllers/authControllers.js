import { authRepository } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function SignUp(req, res) {
    const body = req.body;
    const passwordHash = bcrypt.hashSync(body.password, 10); 
    try {
        await authRepository.SignUp(body.email, passwordHash, body.username, body.pictureUrl)
        res.sendStatus(201);
    } catch (error) {
       res.status(500).send(error); 
    }
   
}

export async function SignIn(req, res) {
    const id = res.locals.id;
    try {
        const token = jwt.sign({ id }, process.env.PRIVATE_KEY_JWT, {
            expiresIn: 3600 // expires in 1h
        });
        res.status(200).send(token);
    } catch (error) {
        res.status(500).send(error);
    }
    
}