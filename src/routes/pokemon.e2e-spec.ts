import request from "supertest";
import app from "../app";

describe("[e2e] pokemon", () => {
    it("shoud be able create a new pokemon", async () => {
        const response = await request(app)
            .post("/pokemons")
            .send({ tipo: "pikachu", treinador: "ash" });

        expect(response.status).toBe(200);
        expect(response.body.nivel).toBe(1);
    });

    it("shoud not be able create a new pokemon with nivel 2", async () => {
        const response = await request(app)
            .post("/pokemons")
            .send({ tipo: "pikachu", treinador: "ash", nivel: 2 });

        expect(response.status).toBe(200);
        expect(response.body.nivel).not.toBe(2);
    });

    it("shoud be able update a pokemon", async () => {
        const response = await request(app)
            .post("/pokemons")
            .send({ tipo: "pikachu", treinador: "ash", nivel: 2 });

        expect(response.status).toBe(200);

        const { body } = response;

        const updateResponse = await request(app)
            .put(`/pokemons/${body.id}`)
            .send({ treinador: "ash2" });

        expect(updateResponse.status).toBe(204);
    });

    it("shoud not be able update a pokemon", async () => {

        const updateResponse = await request(app)
            .put("/pokemons/999")
            .send();

        expect(updateResponse.status).toBe(400);
    });

    it("shoud be able get a pokemon", async () => {
        const response = await request(app)
            .post("/pokemons")
            .send({ tipo: "pikachu", treinador: "ash", });

        expect(response.status).toBe(200);

        const { body } = response;

        const updateResponse = await request(app)
            .get(`/pokemons/${body.id}`)
            .send();

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.nivel).toBeDefined();
        expect(updateResponse.body.id).toBeDefined();
    });
});
