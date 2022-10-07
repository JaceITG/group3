const Server = require("./server.js");
const Client = require("./client.js");

const PORT = 8080;
let server;

(async () => {
    server = new Server(PORT);
    await server.listen();



    const client = new Client(PORT);
    const person = {
        firstName: "Fox",
        lastName: "Mulder",
        age: 45,
    };

    let resp = await client.addPerson(person);
    console.log(resp);
    
    const another = {
        firstName: "yea",
        lastName: "boi",
        age: 14,
    };
    
    const resp2 = await client.addPerson(another);
    console.log(resp2);

    resp = await client.deletePerson("0");
    console.log(resp);
    
    resp = await client.getPerson("0");
    console.log(resp);
    
    resp = await client.getPerson("1");
    console.log(resp);


})();