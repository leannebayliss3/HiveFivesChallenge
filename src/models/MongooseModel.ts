import {IModelOptions} from './IModelOptions';
import mongoose, {Document, Model, Schema} from 'mongoose';

export class MongooseModel {
    readonly model: Model<Document>;
    private readonly schema: Schema;

    constructor(options: IModelOptions) {
        this.schema = new Schema(options.modelSchema, {timestamps: true});
        this.model = mongoose.model(options.modelName, this.schema);
    }
}