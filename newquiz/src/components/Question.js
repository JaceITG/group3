
import './Question.css';

function Question({question, guess, setguess})   // props
{

    function radioChange(e)
    {
        setguess(parseInt(e.target.value));
    }
    return(
        <div className='background'>
            <h1 className='question'> Question {question.id}:</h1>
            <h4> {question.question} </h4>
            <form id='Fred'>
            {question.choices.map((choice,i) =>
                <div key={i}>
                <input type='radio'
                       key={i}
                       value={i}
                       checked={guess === i}
                       onChange={radioChange} />
                <label htmlFor={i}>{choice}</label> <br/>
                </div>
            )}
            </form>
        </div>
    );
}

export default Question;
