import { IResult } from '../../../interfaces/IResult';
import { IResolvers } from "@graphql-tools/utils";
import { IExpansion } from '../../../interfaces/IExpansion';

import { Db } from 'mongodb';

const queryExpansionResolvers: IResolvers = {
    Query: {
        findExpansion: async(_: void, args: {cod: string}, context: { db: Db }): Promise <IResult> => {
          return await context.db.collection("expansion").findOne( {cod: args.cod} )
            .then( (expansionDocument) => {
              console.log(expansionDocument);
              return {
                status: true,
                message: "Expansion encontrada",
                data: expansionDocument as IExpansion
              }
            })
            .catch( (error) => {
              console.log (error);
              return {
                status: false,
                message: "Expansion no encontrada",
              }
            })
        }
    }
}

export default queryExpansionResolvers;