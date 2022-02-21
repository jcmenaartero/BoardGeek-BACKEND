import { IResult } from '../../../interfaces/IResult';
import { IResolvers } from "@graphql-tools/utils";
import { IBoardgame } from '../../../interfaces/IBoardgame';

import { Db } from 'mongodb';

const queryBoardgameResolvers: IResolvers = {
    Query: {
        findBoardgame: async(_: void, args: {id: string}, context: { db: Db }): Promise <IResult> => {
          return await context.db.collection("boardgame").findOne( {id: args.id} )
            .then( (boardgameDocument) => {
              console.log(boardgameDocument);
              return {
                status: true,
                message: "Juego encontrado",
                data: boardgameDocument as IBoardgame
              }
            })
            .catch( (error) => {
              console.log (error);
              return {
                status: false,
                message: "Juego no encontrado",
              }
            })
        }
    }
}

export default queryBoardgameResolvers;