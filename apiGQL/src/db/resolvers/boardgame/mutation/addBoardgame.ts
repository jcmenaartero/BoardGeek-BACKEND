import { IResolvers } from "@graphql-tools/utils";
import { IResult } from "../../../interfaces/IResult";
import { IBoardgame } from "../../../interfaces/IBoardgame";

/* Comentario de prueba */

import { Db } from "mongodb";

const mutationAddBoardgameResolvers: IResolvers = {
    Mutation: {
        addBoardgame: async(_: void, args: {boardgame: IBoardgame}, context: { db: Db }): Promise <IResult> => {
            const dataResult = await context.db.collection("boardgame").insertOne(args.boardgame)
                .then( (data) => {
                    console.log(data);
                    return {
                        status: true,
                        message: "Juego de mesa insertado con exito",
                        data: args.boardgame
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

export default mutationAddBoardgameResolvers;