import { Request, Response } from 'express';
import User from '../models/User';
import AssignMent from '../models/Assignment';
import Joi from 'joi'
import Assignment from '../models/Assignment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ROLES } from '../utils/constant'

export const getAssignments = async (req: Request, res: Response): Promise<void> => {
    const adminId = req.userId;

    try {
        const assignments = await Assignment.find({ adminId }).populate('userId', 'name').sort({_id: -1});
        res.status(200).json({ message: 'Assignments found successfully', data: assignments });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};

export const acceptAssignment = async (req: Request, res: Response) => {
    try {
        //can add a query to check whether if its a valid id and is the admin authorized to change the status of assignment
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'Accepted' });
        res.status(200).json({ message: 'Assignment accepted.', data: assignment });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};

export const rejectAssignment = async (req: Request, res: Response) => {
    try {
        //can add a query to check whether if its a valid id and is the admin authorized to change the status of assignment
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
        res.status(200).json({ message: 'Assignment rejected.', data: assignment });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};
