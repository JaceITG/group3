/*
*   Person database client script from CS479 Assignment 2
*/

const net = require("net");

class UserClient {
    constructor(port) {
        this.port = port;
    }

    // addPerson sends a CREATE person request to the server. This method is
    // done for you.
    async addUser(user) {
        if(user === undefined) {
            throw new TypeError("person is undefined");
        }
        const request = {
            dtype: "user",
            action: "create",
            user: user,
        };
        const resp = await this.makeRequest(request);
        return resp;
    }

    // TODO: updatePerson sends a UPDATE request to the server. 'id' is the id
    // of the person you want to update, and 'person' should contain ONLY the
    // fields that will be updated. Both should be sent to the server.
    async updateUser(id, newFields) {
        if (id === undefined || newFields === undefined) {
            throw new TypeError("id or fields to update not given");
        }
        const request = {
            dtype: "user",
            action: "update",
            id: id,
            user: newFields,
        };
        const resp = await this.makeRequest(request);
        return resp;
    }

    // TODO: getPerson sends a READ request to the server. 'id' is the id of the
    // person you want to retrieve.
    async getUser(id) {
        if (id === undefined) {
            throw new TypeError("id is undefined");
        }

        const request = {
            dtype: "user",
            action: "read",
            id: id,
        };
        const resp = await this.makeRequest(request);
        return resp;
    }

    // TODO: deletePerson sends a DELETE request to the server. 'id' is the id
    // of the person you want to delete.
    async deleteUser(id) {
        if (id === undefined) {
            throw new TypeError("id is undefined");
        }

        const request = {
            dtype: "user",
            action: "delete",
            id: id,
        };
        const resp = await this.makeRequest(request);
        return resp;
    }

    async getQuestion(id){
        if (id === undefined) {
            throw new TypeError("id is undefined");
        }

        const request = {
            dtype: "question",
            action: "read",
            id: id,
        };

        const resp = await this.makeRequest(request);
        return resp;
    }

    async makeRequest(payload) {
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

module.exports = UserClient;
