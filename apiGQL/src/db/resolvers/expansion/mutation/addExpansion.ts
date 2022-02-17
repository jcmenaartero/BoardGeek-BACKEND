import { IResolvers } from "@graphql-tools/utils";
import { IResult } from "../../../interfaces/IResult";
import { IExpansion } from "../../../interfaces/IExpansion";

import { Db } from "mongodb";

const mutationAddExpansionResolvers: IResolvers = {
    Mutation: {
        addExpansion: async(_: void, args: {expansion: IExpansion}, context: { db: Db }): Promise <IResult> => {
            const dataResult = await context.db.collection("expansion").insertOne(args.expansion)
                .then( (data) => {
                    console.log(data);
                    return {
                        status: true,
                        message: "Expansion insertada con exito",
                        data: args.expansion
                    }
                }).catch ( (error) => {
                    return { 
                        status: false,
                        message: `Error: ${error}`
                    }
                })
            return dataResult;
        }
        
    }


}

export default mutationAddExpansionResolvers;