import { IResolvers } from "@graphql-tools/utils";
import { Db } from 'mongodb';
import { IExpansion } from "../../../interfaces/IExpansion";

const queryExpansionResolvers: IResolvers = {
    Query: {
        expansionList: async(_: void, __:unknown, context: { db: Db }): Promise <Array<IExpansion>> => { 
          const expansions = await context.db.collection("expansion").find().toArray() as Array<IExpansion>;
          
          return expansions;
        }
    }
}

export default queryExpansionResolvers;