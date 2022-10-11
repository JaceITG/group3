/*
*   Person database client script from CS479 Assignment 2
*/

const net = require("net");

class PersonClient {
    constructor(port) {
        this.port = port;
    }

    // addPerson sends a CREATE person request to the server. This method is
    // done for you.
    async addPerson(person) {
        if(person === undefined) {
            throw new TypeError("person is undefined");
        }
        const request = {
            action: "create",
            person: person,
        };
        const resp = await this.#makeRequest(request);
        return resp;
    }

    // TODO: updatePerson sends a UPDATE request to the server. 'id' is the id
    // of the person you want to update, and 'person' should contain ONLY the
    // fields that will be updated. Both should be sent to the server.
    async updatePerson(id, newFields) {
        if (id === undefined || newFields === undefined) {
            throw new TypeError("id or fields to update not given");
        }
        const request = {
            action: "update",
            id: id,
            person: newFields,
        };
        const resp = await this.#makeRequest(request);
        return resp;
    }

    // TODO: getPerson sends a READ request to the server. 'id' is the id of the
    // person you want to retrieve.
    async getPerson(id) {
        if (id === undefined) {
            throw new TypeError("id is undefined");
        }

        const request = {
            action: "read",
            id: id,
        };
        const resp = await this.#makeRequest(request);
        return resp;
    }

    // TODO: deletePerson sends a DELETE request to the server. 'id' is the id
    // of the person you want to delete.
    async deletePerson(id) {
        if (id === undefined) {
            throw new TypeError("id is undefined");
        }

        const request = {
            action: "delete",
            id: id,
        };
        const resp = await this.#makeRequest(request);
        return resp;
    }

    async #makeRequest(payload) {
        const socket = net.createConnection(this.port);
        socket.setTimeout(5000);
        const promise = new Promise((resolve, reject) => {
            socket.on("data", (data) => {
                const resp = JSON.parse(data);
                resolve(resp);
                socket.end();
            });
            socket.on("error", (error) => {
                reject(error);
                socket.end();
            });
            socket.on("timeout", () => {
                reject(new Error("connection timed out"));
                socket.end();
            });
        });
        socket.write(JSON.stringify(payload));
        return promise;
    }
}

module.exports = PersonClient;
