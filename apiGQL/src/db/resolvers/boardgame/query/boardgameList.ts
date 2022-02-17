import { IResolvers } from "@graphql-tools/utils";
import { Db } from 'mongodb';
import { IBoardgame } from '../../../interfaces/IBoardgame';

const queryBoardgameResolvers: IResolvers = {
    Query: {
        boardgameList: async(_: void, __:unknown, context: { db: Db }): Promise <Array<IBoardgame>> => { 
          const boardgames = await context.db.collection("boardgame").find().toArray() as Array<IBoardgame>;
          return boardgames;
        }
    }
}

export default queryBoardgameResolvers;