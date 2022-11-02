const Server = require("./server.js");
const Client = require("./client.js");

const PORT = 3018;
let server;

(async () => {
    server = new Server(PORT);
    await server.listen();



    const client = new Client(PORT);
    const person = {
        username: "student",
    };

    let resp = await client.addUser(person);
    console.log(resp);
    
    const another = {
        username: "admin",
    };
    
    const resp2 = await client.addUser(another);
    console.log(resp2);

    resp = await client.deleteUser("0");
    console.log(resp);
    
    resp = await client.getUser("0");
    console.log(resp);
    
    resp = await client.getUser("1");
    console.log(resp);

    console.log("QUESTION TESTS");
    resp = await client.getQuestion("2");
    console.log(resp);

    await server.close();

})();