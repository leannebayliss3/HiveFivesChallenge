import mongoose from 'mongoose';
import {composeMongoose} from "graphql-compose-mongoose";
import {ObjectTypeComposer} from "graphql-compose";
import {GenerateResolverType} from "graphql-compose-mongoose/lib/composeMongoose";

export class MongooseModel {
    readonly model: mongoose.Model<any>;
    readonly modelTC: ObjectTypeComposer & {
        mongooseResolvers: GenerateResolverType<any>;
    };

    private schema: mongoose.Schema | undefined = undefined;

    constructor(options: { modelName: string, modelSchema: {}, modelTCOpts: {} }) {
        this.schema = new mongoose.Schema(options.modelSchema);
        this.model = mongoose.model(options.modelName, this.schema);
        this.modelTC = composeMongoose(this.model, options.modelTCOpts);
        this.modelTC.mongooseResolvers.createOne();
    }

}


// import {composeWithMongoose, ComposeWithMongooseOpts} from 'graphql-compose-mongoose';
// import {ObjectTypeComposer} from "graphql-compose";
// import {Model} from "./Model";
//
// class recognitionModel implements Model {
//     readonly Model: Model<any>;
//     readonly ModelTC: ObjectTypeComposer;
//
//     constructor(opts: { modelName: string, modelSchema: Schema<any, any> }) {
//         this.Model = this.createModel(opts.modelName, opts.modelSchema)
//     }
//
//     get model() {
//         return this.Model;
//     }
//
//
//
//     private createModel(modelName: string, modelSchema: Schema<any, any>): Model<any> {
//         return mongoose.model(modelName, modelSchema);
//     }modelSchema
//
// }