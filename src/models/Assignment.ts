import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  userId: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  task: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  timestamp: Date;
}

const AssignmentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  timestamp: { type: Date, default: Date.now },
});

const AssignMent = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
export default AssignMent;
