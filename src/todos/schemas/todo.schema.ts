import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    color: String,
    isImportant: Boolean,
    userTodoRef:{type: String,ref:"users"}
})