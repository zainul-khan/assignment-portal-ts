import { Request, Response } from 'express';
import User from '../models/User';
import Joi from 'joi'
import Assignment from '../models/Assignment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ROLES } from '../utils/constant'


const JWT_SECRET: string = process.env.JWT_SECRET || 'Secret';

export const register = async (req: Request, res: Response) : Promise<void>  => {
  try {

    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(8).required(),
        role: Joi.valid(ROLES.ADMIN, ROLES.USER).required()
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
        res.status(400).json({error: error.details[0].message})
        return;
    }

    const emailExist = await User.findOne({email: value.email});

    if (emailExist) {
         res.status(400).json({error: 'This email is already registered on our platform'});
         return;
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const newUser = new User({ name: value.name, email: value.email, password: hashedPassword, role: value.role });
    const user = await newUser.save();
    res.status(201).json({ message: 'User registered successfully.', data: user });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Error registering user.' });
  }
};

export const login = async (req: Request, res: Response) : Promise<void>  => {

  try {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(8).required()
    });

    const {error, value} = schema.validate(req.body);
    console.log('error', error, 'value', value)
    if (error) {
        res.status(400).json({error: error.details[0].message});
        return;
    }

    const user = await User.findOne({ email: value.email });
    if (!user) {
        res.status(400).json({ error: 'Invalid Credentials.' });
        return;
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
        res.status(400).json({ error: 'Invalid Credentials.' });
        return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({  message: 'User logged in successfully.', data: {user, token} });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


export const uploadAssignment = async (req: Request, res: Response) : Promise<void>  => {
  const { task, adminId } = req.body;
  const userId: any = req?.userId;

  if (!task || !adminId) {
     res.status(400).json({ error: 'Task and Admin ID are required.' });
     return;
  }

  try {
    const admin = await User.findOne({ _id: adminId });
    console.log('admin', admin)
    if (!admin) {
        res.status(400).json({ error: 'Invalid Admn.' });
        return;
    }

    const newAssignment = new Assignment({ userId, adminId, task });
    const assignment = await newAssignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully.', data: assignment });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
