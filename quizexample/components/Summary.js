
import './Summary.css';

function Summary({qlist, right, wrong})
{
    return(
        <div className='summary'>
            <h1> Results</h1>
            <h3> {`${right} Right and ${wrong} Wrong`} </h3>
            <div>
            {qlist.filter((question) => question.answer !== question.guess).map((question,i) =>
                <div key={i}>
                <h5> {question.question + "    "} </h5>
                <h6> Correct answer was {question.choices[question.answer]}, you guessed {(question.guess !== null) ? question.choices[question.guess] : "Nothing"}. </h6>
                </div>
            )}
            </div>
        </div>
    );
}

export default Summary;
