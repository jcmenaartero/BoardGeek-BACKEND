import { IExpansion } from "./IExpansion";

enum enumDificulty {
    Sencillo,
    Moderado,
    Complejo
}

export interface IBoardgame {
    _id?:          any;
    id:            string;
    title:         string;
    publisher:     string;
    language?:     string;
    dificulty:     enumDificulty;
    thumbnail?:    string;
    description?:  string;
    min_players?:   number;
    max_players?:   number;
    play_time?:    string;
    price:         number;
    expansions?:    Array<IExpansion>;
}