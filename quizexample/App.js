
import { useState } from 'react';
import Question from './components/Question';
import Summary from './components/Summary';
import { questions } from './content.js';

function App() {

    const [qNumber, setQNumber] = useState(0);
    const [guess, setGuess] = useState(null);
    const [right, setRight] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [done, setDone] = useState(false);

    function processQuestion(e)
    {
        questions[qNumber].guess = guess;
        if(guess === questions[qNumber].answer){
            setRight(right+1);
        } else {
            setWrong(wrong+1);
        }
        setGuess(null);
        if(qNumber+1 === questions.length){
            setDone(true);
        } else {
            setQNumber((qNumber + 1) % questions.length);
        }
    }
    if(done){
        return(
            <Summary qlist={questions} right={right} wrong={wrong} />
        );
    }
    return(
        <main>
            <Question question={questions[qNumber]} guess={guess} setguess={setGuess} />
            <button onClick={processQuestion}>Submit</button>
        </main>
    );
}

export default App;
