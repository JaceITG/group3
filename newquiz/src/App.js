
import { useState } from 'react';
import Question from './components/Question';
import Summary from './components/Summary';
import { questions } from './content.js';
import { users } from './userDeets.js';
import './components/Question.css'
import Validation from './components/Validation';

//var valid = false; didnt work
var answerList = [];

function App() {

    const [qNumber, setQNumber] = useState(0);
    const [guess, setGuess] = useState(null);
    const [right, setRight] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [done, setDone] = useState(false); //[1st,2nd], 2nd(true) changes the first to true.
    const [valid, setValid] = useState(false); //setting this true shuts down validator
    
    
    useEffect(() => {
        async function fetchQs() {
            const res = await fetch(url);   // fetch returns a promise
            const data = await res.json();
            setQuestionList(data);
            console.log(data);
        }
        fetchQs();
    }, []);
    
   /* function tvalidate(){  function testing
        console.log(valid);
        setValid(true);
        console.log(valid);
        
    }*/
    function validate(){
        console.log(users.length);
        console.log(users[0].userName)
        console.log(users[0].passWord)
        let user = document.forms["myForm"]["user"].value;
        let pass = document.forms["myForm"]["pass"].value;
        console.log(pass);
        console.log(user);
        for(let i=0; i <= users.length; i++){
            
            if(user === users[i].userName && pass === users[i].passWord){
                setValid(true);
        }else{
            alert("Invalid Input");
            console.log("fail");
        }
        }
    }

    function previousQuestion(){
        if(qNumber >= 1){
            setQNumber(qNumber - 1);
            if(answerList[answerList.length - 1] === "right"){
                setRight(right-1);
                console.log(answerList);
                answerList.pop()
            }
            else{
                setWrong(wrong-1);
                console.log(answerList)
                answerList.pop()
            }
        }
  
    }


    function processQuestion()
    {
        questions[qNumber].guess = guess;
        if(guess === questions[qNumber].answer){
            setRight(right+1);
            answerList.push("right");
            console.log(answerList);
        } else {
            setWrong(wrong+1);
            answerList.push("wrong");
            console.log(answerList);
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
    
    if(valid === true){ //validation testing
        if(qNumber === 0){
            var PreviousButton = "";
        }
        else {
            PreviousButton = "Previous";
        }
        if(qNumber === questions.length - 1){
            var NextButton = "Submit";
        }
        else{
            NextButton = "Next";
        }
        
    return(
        <main className='background'>
            <Question question={questions[qNumber]} guess={guess} setguess={setGuess} />
            <button onClick={processQuestion}>{NextButton}</button>
            
            <button onClick={previousQuestion}>{PreviousButton}</button>
        </main>
    );
    }//validation testing
   if(valid === false){
    return(        
        <Validation validate={validate} />
       );
    }
    
}

export default App;
