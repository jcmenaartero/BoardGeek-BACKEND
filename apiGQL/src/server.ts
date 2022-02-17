import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { createServer, Server } from "http";
import Database from "./config/database";
import environments from "./config/environment";
import { IContext } from "./db/interfaces/IContext";

const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

class GraphQLServer {
    //propiedades
    private app!: Application;
    private httpServer!: Server;
    private readonly DEFAULT_PORT = (process.env.PORT) ? +process.env.PORT : 3025;
    private schema!: GraphQLSchema;

    constructor( schema: GraphQLSchema){
        if (schema === undefined){
            throw new Error('necesitamos una defición de GraphQL')
        }
        this.schema = schema;
        this.init();
    }
    
    private init() {
        this.initializeEnvironments();
        this.configExpress();
        this.configApolloExpress();
        this.configRoutes();
    }
    private initializeEnvironments(){
        if (process.env.NODE_ENV !== 'production') {
            const envs = environments;
            console.log(envs);
        }
    }
    private configExpress(){
        this.app = express();
        this.app.use(compression());
        this.httpServer = createServer(this.app);
    }

    private async configApolloExpress() {
        //Inicializar la Base de Datos 
        const database = new Database();
        const db = await database.init();
        
        //contexto --> info a compartir en los resolvers: instancia de la BD, Token, obj pup/shup para actualizaciones en tiempo real con los subscriptions
        const context = async({ req, connection }: IContext) => {
            //obtener el token desde las cabeceras de la request
            const token = req ? req.headers.authorization : connection.authorization;
            return { db, token } //los usamos como 3er parámetro en los resolvers
        };
        //añadimos el contexto a las propiedades de ApolloServer
        const apolloServer = new ApolloServer({
            schema: this.schema,
            introspection: true,
            context
        });
        await apolloServer.start();
        apolloServer.applyMiddleware({app: this.app, cors: true})
    }

    private configRoutes(){
        this.app.get("/hello", ( _, res ) => {
            res.send("Bienvenidos al proyecto");
        });
        //redicreccionamos haccia /graphql para entrar en su playground
        this.app.get("/", ( _, res ) => {
            res.redirect("/graphql");
        });
    }

    listen(callback: (port: number) => void ): void {
        this.httpServer.listen(+this.DEFAULT_PORT, () => {
            callback(+this.DEFAULT_PORT)
        })
    }

    

}

export default GraphQLServer;