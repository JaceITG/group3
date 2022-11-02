
import { useState, useEffect } from 'react';
import Question from './components/Question';
import Summary from './components/Summary';
import UserServer from './database/server.js';
import UserClient from './database/client.js';

const PORT = 3018;

async function App() {

    const [questionList, setQuestionList] = useState([]);
    const [qNumber, setQNumber] = useState(0);
    const [guess, setGuess] = useState(null);
    const [right, setRight] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [done, setDone] = useState(false);

    const server = new UserServer(PORT);
    await server.listen();

    const client = new UserClient(PORT);

    useEffect(() => {
        async function fetchQs() {
            const res = await client.getQuestionList();   // fetch returns a promise
            const data = res.questions;
            setQuestionList(data);
            console.log(data);
        }
        fetchQs();
    }, []);

    if(questionList.length === 0) return(<h1>Cannot get questions from server.</h1>);

    function processQuestion(e)
    {
        questionList[qNumber].guess = guess;
        if(guess === questionList[qNumber].answer){
            setRight(right+1);
        } else {
            setWrong(wrong+1);
        }
        setGuess(null);
        if(qNumber+1 === questionList.length){
            setDone(true);
        } else {
            setQNumber((qNumber + 1) % questionList.length);
        }
    }
    if(done){
        return(
            <Summary qlist={questionList} right={right} wrong={wrong} />
        );
    }
    return(
        <main>
            <Question question={questionList[qNumber]} guess={guess} setguess={setGuess} />
            <button onClick={processQuestion}>Submit</button>
        </main>
    );
}

export default App;
