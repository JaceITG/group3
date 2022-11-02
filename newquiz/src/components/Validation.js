import './Validation.css'

function Validation({validate}){
    return(        
        <form className='validation' name="myForm">
            <h1>For testing purposes, use user name "admin" and password "pass"</h1>
            <h2><label>
                User Name:
                <input type="text" name="user"  />
            </label>
            </h2>
            <h3>
            <label>
                Password:
                <input type="text" name="pass" />
            </label>
            </h3>
                <button onClick={validate}>Sign on</button>
        </form>
       );
}

export default Validation;