import {CustomRecognitionResolvers} from "./CustomRecognitionResolvers";
import {Model} from "mongoose";
import {ObjectTypeComposer} from "graphql-compose";

export class RecognitionResolvers {
    private CustomResolvers: CustomRecognitionResolvers;
    private graphQlTC: ObjectTypeComposer;
    private readonly _queryResolvers: {} ;
    private readonly _mutationResolvers: {};

    constructor(mongooseModel: Model<any>, graphQlTC: ObjectTypeComposer) {
        this.CustomResolvers = new CustomRecognitionResolvers(mongooseModel, graphQlTC);
        this.graphQlTC = graphQlTC;
        this.CustomResolvers.loadCustomResolvers();

        this._queryResolvers = {
            getRecognitionById: this.graphQlTC.getResolver('findById'),
            getRecognitions: this.graphQlTC.getResolver('getRecognitions')
        }
        this._mutationResolvers = {
            recognitionCreateOne: this.graphQlTC.getResolver('createOne'),
        }
    }


    get queryResolvers (): {}{
        return this._queryResolvers
    }

    get mutationResolvers (): {} {
        return this._mutationResolvers
    }





}