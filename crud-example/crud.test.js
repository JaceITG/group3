const Server = require("./server.js");
const Client = require("./client.js");

const PORT = 8080;
let server;

beforeEach(async () => {
    server = new Server(PORT);
    await server.listen();
});

afterEach(async () => {
    await server.close();
});

describe("add person", () => {
    test("person undefined failure", async () => {
        const client = new Client(PORT);
        let error = undefined;
        try {
            await client.addPerson();
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined();
    });

    test("duplicate person failure", async () => {
        const client = new Client(PORT);
        const person = {
            firstName: "Fox",
            lastName: "Mulder",
            age: 45,
        };
        let expected = {success: true};

        let resp = await client.addPerson(person);
        expect(resp.success).toBe(expected.success);

        resp = await client.addPerson(person);
        expected.success = false;
        expect(resp.success).toBe(expected.success);
        expect(resp.id).toBeUndefined();
    });

    test("success", async () => {
        const client = new Client(PORT);
        const person = {
            firstName: "Fox",
            lastName: "Mulder",
            age: 45,
        };
        const expected = {success: true};
        const resp = await client.addPerson(person);
        expect(resp.success).toBe(expected.success);
        expect(resp.id).toBeDefined();
    });
});

describe("update person", () => {
    test("id undefined failure", async () => {
        const client = new Client(PORT);
        let error = undefined;
        try {
            await client.updatePerson();
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined();
    });

    test("empty update parameters failure", async () => {
        const client = new Client(PORT);
        let error = undefined;
        try {
            await client.updatePerson("fake id");
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined();
    });

    test("person does not exist failure", async () => {
        const client = new Client(PORT);
        const resp = await client.updatePerson("fake id", {firstName: "Harry"});
        expect(resp.success).toBe(false);
    });

    test("success", async () => {
        const client = new Client(PORT);
        const person = {
            firstName: "Fox",
            lastName: "Mulder",
            age: 45,
        };
        let resp = await client.addPerson(person);
        resp = await client.updatePerson(resp.id, {firstName: "Harry"});
        expect(resp.success).toBe(true);
    });
});

describe("get person", () => {
    test("id undefined failure", async () => {
        const client = new Client(PORT);
        let error = undefined;
        try {
            await client.getPerson();
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined();
    });

    test("person does not exist failure", async () => {
        const client = new Client(PORT);
        const resp = await client.getPerson("fake id");
        expect(resp.success).toBe(false);
    });

    test("success", async () => {
        const client = new Client(PORT);
        const person = {
            firstName: "Fox",
            lastName: "Mulder",
            age: 45,
        };
        let resp = await client.addPerson(person);
        resp = await client.getPerson(resp.id);
        expect(resp.success).toBe(true);
        expect(resp.person).toMatchObject(person);
    });
});

describe("delete person", () => {
    test("id undefined failure", async () => {
        const client = new Client(PORT);
        let error = undefined;
        try {
            await client.deletePerson();
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined();
    });

    test("person does not exist failure", async () => {
        const client = new Client(PORT);
        const resp = await client.deletePerson("fake id");
        expect(resp.success).toBe(false);
    });

    test("success", async () => {
        const client = new Client(PORT);
        const person = {
            firstName: "Fox",
            lastName: "Mulder",
            age: 45,
        };
        let resp = await client.addPerson(person);
        resp = await client.deletePerson(resp.id);
        expect(resp.success).toBe(true);
    });
});

