import "graphql-import-node"; //genera el módulo schema.graphql
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";
//obtenemos el directorio actual
import path from "path"; 
//carga los ficheros de forma sincrona
import { loadFilesSync } from "@graphql-tools/load-files";
//mezcla los tipos de definicion cargados
import { mergeTypeDefs } from "@graphql-tools/merge";

const typesArray = loadFilesSync(path.join(__dirname, "./graphql"), {
    extensions: ["graphql"],
});

//import typeDefs from './schema.graphql'; --> 1 sola definicion
//array de los tipos de definicion cargados desde el directorio types
const typeDefs = mergeTypeDefs(typesArray);

import resolvers from '../resolvers';

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;