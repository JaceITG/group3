/*
*   User database server script from CS479 Assignment 2
*/

const net = require("net");

// TODO: UserServer needs some functionality added:
// - It needs to process CRUD requests based on the "action" parameter in each
//   request. A good place to do this would be in #handleRequest.
// - It needs to persist data between requests. Each user should be assigned
//   an id (how is up to you, as long as it's a string), and stored in a data
//   structure (e.g. a map).
//   This data structure is a stand-in for a real database. This data structure
//   should be used for each CRUD request.
class UserServer {
    //Create a server with a new dataset on a given port
    constructor(port) {
        this.server = net.createServer((socket) => this.#handleConnection(socket));
        this.port = port;
        this.ids = 0;
        this.qids = 0;
        this.data = {};
        this.questions = {};
    }

    //Catch incoming socket requests
    #handleConnection(socket) {
        socket.on("data", (data) => this.#handleRequest(socket, data));
    }

    #handleRequest(socket, data) {
        const req = JSON.parse(data);
        console.log(req);

        let resp = {success: false};
        //Parse the action being requested by the client
        if(req.dtype == "question"){
            resp = this.question(req);
        }else if(req.dtype == "user"){
            switch(req.action){
                case "create":
                    resp = this.create(req.user);
                    break;
                case "update":
                    resp = this.update(req.id, req.user);
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
        }else{
            throw new TypeError("invalid datatype request");
        }

        socket.end(JSON.stringify(resp));
    }

    //Add a new user object to the data dictionary with a unique ID
    create(user){
        //Make sure this user isn't alread in structure
        let dupExists = false;
        Object.values(this.data).forEach(p => {
            if(this.sameUser(p, user)){
                dupExists = true;
                return;
            }
        });

        if(dupExists) return {success: false};

        let newID = this.ids.toString();
        this.ids++;

        this.data[newID] = user;
        return {success: true, id: newID};
    }

    //Update an existing user object in the data dictionary
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

    //Retreive an existing user from the database
    read(id){
        //fail if this id does not yet exist in data
        if (this.data[id] === undefined) {
            return { success: false };
        }

        return {success: true, user: this.data[id]};
    }

    delete(id){
        //User doesn't exist in the database
        if (this.data[id] === undefined) {
            return { success: false };
        }

        this.data[id] = undefined;
        return {success:true};
    }

    question(request){
        if(request.action == "read"){
            let q = questions[request.id]
            if(q === undefined){
                return { success: false };
            }
            return {success: true, question: q};
        }else if(request.action == "create"){
            let newQID = this.qids.toString();
            this.qids++;
            questions[newQID] = request.question;
            return {success: true, id: newQID};
        }
    }

    //User Objects considered equivalent if all parameters match
    sameUser(user1, user2){
        if(user1.uname != user2.uname) return false;
        //if(user1.email != user2.email) return false;
        return true;
    }

    async listen() {
        return new Promise(resolve => this.server.listen(this.port, resolve));
    }

    async close() {
        return new Promise(resolve => this.server.close(resolve));
    }
}

module.exports = UserServer;
