import { IResolvers } from "@graphql-tools/utils";

// resolvemos los tipos de datos de las uniones
const typesUnionResolvers: IResolvers = {
    dataDB: { //type object DataBD
    __resolveType(obj: { title: string; cod: string }) {

        
      if (obj.title) {
        return "Boardgame";
      }
      if (obj.cod) {
        return "Expansion";
      }
      return null; // GraphQLError is thrown
    },
  },
  
  
};

export default typesUnionResolvers;