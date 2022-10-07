const net = require("net");

// TODO: PersonServer needs some functionality added:
// - It needs to process CRUD requests based on the "action" parameter in each
//   request. A good place to do this would be in #handleRequest.
// - It needs to persist data between requests. Each person should be assigned
//   an id (how is up to you, as long as it's a string), and stored in a data
//   structure (e.g. a map).
//   This data structure is a stand-in for a real database. This data structure
//   should be used for each CRUD request.
class PersonServer {
    constructor(port) {
        this.server = net.createServer((socket) => this.#handleConnection(socket));
        this.port = port;
        this.ids = 0;
        this.data = {};
    }

    #handleConnection(socket) {
        socket.on("data", (data) => this.#handleRequest(socket, data));
    }

    #handleRequest(socket, data) {
        const req = JSON.parse(data);
        console.log(req);

        let resp = {success: false};
        switch(req.action){
            case "create":
                resp = this.create(req.person);
                break;
            case "update":
                resp = this.update(req.id, req.person);
                break;
            case "read":
                resp = this.read(req.id);
                break;
            case "delete":
                resp = this.delete(req.id);
                break;
            default:
                throw new TypeError("invalid request action");
        }

        socket.end(JSON.stringify(resp));
    }

    //Add a new person object to the data dictionary with a unique ID
    create(person){
        //Make sure this person isn't alread in structure
        let dupExists = false;
        Object.values(this.data).forEach(p => {
            if(this.samePerson(p, person)){
                dupExists = true;
                return;
            }
        });

        if(dupExists) return {success: false};

        let newID = this.ids.toString();
        this.ids++;

        this.data[newID] = person;
        return {success: true, id: newID};
    }

    //Update an existing person object in the data dictionary
    update(id, fields){
        //fail if this id does not yet exist in data
        if(this.data[id] === undefined){
            return {success: false};
        }

        //Update each property passed by client
        for(const property in fields){
            this.data[id][property] = fields[property];
        }
        return {success: true, id: id}
    }

    //Retreive an existing person from the database
    read(id){
        //fail if this id does not yet exist in data
        if (this.data[id] === undefined) {
            return { success: false };
        }

        return {success: true, person: this.data[id]};
    }

    delete(id){
        //Person doesn't exist in the database
        if (this.data[id] === undefined) {
            return { success: false };
        }

        this.data[id] = undefined;
        return {success:true};
    }

    samePerson(person1, person2){
        if(person1.firstName != person2.firstName) return false;
        if(person1.lastName != person2.lastName) return false;
        return person1.age == person2.age;
    }

    async listen() {
        return new Promise(resolve => this.server.listen(this.port, resolve));
    }

    async close() {
        return new Promise(resolve => this.server.close(resolve));
    }
}

module.exports = PersonServer;
