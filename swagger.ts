import path from "path";
import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = [path.join(__dirname, 'src/routes.ts')];

const doc = {
    info: {
        version: "1.0",
        title: "REST API pokemons",
        description: "create, update, list and delete pokemons"
    },
    host: "localhost:3001"
};

swaggerAutogen(outputFile, endpointsFiles, doc);
