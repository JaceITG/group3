
import { useState } from 'react';
import Question from './components/Question';
import Summary from './components/Summary';
import { questions } from './content.js';
import { users } from './userDeets.js';

//var valid = false; didnt work
var answerList = [];
function App() {

    const [qNumber, setQNumber] = useState(0);
    const [guess, setGuess, user, pass] = useState(null);
    const [right, setRight] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [done, setDone] = useState(false); //[1st,2nd], 2nd(true) changes the first to true.
    const [valid, setValid] = useState(false); //setting this true shuts down validator

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
    return(
        <main>
            <Question question={questions[qNumber]} guess={guess} setguess={setGuess} />
            <button onClick={processQuestion}>Submit</button>
            <button onClick={previousQuestion}>Previous</button>
        </main>
    );
    }//validation testing
   if(valid === false){
    return(
        <form name="myForm">
            <h1>For testing purposes, use user name "admin" and password "pass"</h1>
            <label>
                User Name:
                <input type="text" name="user"  />
            </label>
            <label>
                Password:
                <input type="text" name="pass" />
            </label>
                <button onClick={validate}>Submit</button>
        </form>
       );
    }

}

export default App;
