import mongoose from 'mongoose';
import {composeWithMongoose} from "graphql-compose-mongoose";
import {ObjectTypeComposer} from "graphql-compose";

export class MongooseModel {
    readonly model: mongoose.Model<any>;
    readonly modelTC: ObjectTypeComposer;

    private schema: mongoose.Schema;

    constructor(options: { modelName: string, modelSchema: {}, modelTCOpts: {} }) {
        this.schema = new mongoose.Schema(options.modelSchema, {timestamps: true});
        this.model = mongoose.model(options.modelName, this.schema);
        this.modelTC = composeWithMongoose(this.model, options.modelTCOpts);
    }
}