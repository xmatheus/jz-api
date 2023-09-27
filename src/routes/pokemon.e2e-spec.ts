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
        const updateResponse = await request(app).put("/pokemons/999").send();

        expect(updateResponse.status).toBe(400);
    });

    it("shoud be able get a pokemon", async () => {
        const response = await request(app)
            .post("/pokemons")
            .send({ tipo: "pikachu", treinador: "ash" });

        expect(response.status).toBe(200);

        const { body } = response;

        const getResponse = await request(app)
            .get(`/pokemons/${body.id}`)
            .send();

        expect(getResponse.status).toBe(200);
        expect(getResponse.body.nivel).toBeDefined();
        expect(getResponse.body.id).toBeDefined();
    });

    it("shoud be able to delete a pokemon", async () => {
        const response = await request(app)
            .post("/pokemons")
            .send({ tipo: "pikachu", treinador: "ash" });

        expect(response.status).toBe(200);

        const { body } = response;

        const deleteResponse = await request(app)
            .delete(`/pokemons/${body.id}`)
            .send();

        const getResponse = await request(app)
            .get(`/pokemons/${body.id}`)
            .send();

        expect(deleteResponse.status).toBe(204);
        expect(deleteResponse.body).toStrictEqual({});

        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toStrictEqual({});
    });

    it("shoud not be able to delete a pokemon", async () => {
        const deleteResponse = await request(app)
            .delete(`/pokemons/99999`)
            .send();

        expect(deleteResponse.status).toBe(400);
    });

    it("shoud be able to list all pokemons", async () => {
        const response = await request(app).get(`/pokemons`).send();

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it("should be able to perform a pokemon battle", async () => {
        const response1 = await request(app)
            .post("/pokemons")
            .send({ tipo: "pikachu", treinador: "ash" });

        const response2 = await request(app)
            .post("/pokemons")
            .send({ tipo: "charizard", treinador: "misty" });

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);

        const { id: id1 } = response1.body;
        const { id: id2 } = response2.body;

        // Perform the battle
        const battleResponse = await request(app)
            .post("/pokemons/battle")
            .send({ id1, id2 });

        expect(battleResponse.status).toBe(200);
        expect(battleResponse.body.vencedor).toBeDefined();
        expect(battleResponse.body.perdedor).toBeDefined();
    });
});
