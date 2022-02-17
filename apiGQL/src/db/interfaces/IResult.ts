import { IBoardgame } from './IBoardgame';
import { IExpansion } from './IExpansion';

export interface IResult {
    status: boolean;
    message: string;
    data?: DataDB
}

type DataDB =
    | IBoardgame
    | IExpansion
    | null
    | undefined ;

