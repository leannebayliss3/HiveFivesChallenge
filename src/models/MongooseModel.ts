import mongoose from 'mongoose'

export class MongooseModel {
    readonly model: mongoose.Model<any>;
    private readonly schema: mongoose.Schema;

    constructor(options: { modelName: string, modelSchema: {}, modelTCOpts: {} }) {
        this.schema = new mongoose.Schema(options.modelSchema, {timestamps: true});
        this.model = mongoose.model(options.modelName, this.schema);
    }
}