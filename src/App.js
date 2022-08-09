import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {

  const numbers = '0123456789'
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerCaseLetters ='abcdefghijklmnopqrstuvwxyz'
  const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é"



const [length, setLength] = useState('');
const [password, setPassword] = useState('');
const [uppercase, setUppercase] = useState(false);
const [lowercase, setLowercase] = useState(false);
const [number, setNumber] = useState(false);
const [symbol, setSymbol] = useState(false);

const copyPrompt = document.querySelectorAll('.copyPrompt')



const generatePassword = () => {
  
  let availableChars = '';
  let tempPassword = '';
  
  if(length < 10){
    alert('Please enter a password with a greater length')
    return
  } 
  if(!uppercase && !lowercase && !number && !symbol){
    alert('Please select at least one checkbox')
    return
  }
  if(uppercase === true){
    availableChars += upperCaseLetters
  } 
  if(lowercase === true){
    availableChars += lowerCaseLetters
  } 
  if(number === true){
    availableChars += numbers
  } 
  if(symbol === true){
    availableChars += specialCharacters
  } 
 
  for(let i = 0; i < length; i++){
    
    let multiply = Math.floor(Math.random() * availableChars.length)
    tempPassword += availableChars[multiply]
  }
  setPassword(tempPassword)
  
}



useEffect(() => {
  setLength(10)
  console.log('ran')
},[])

const promptTrigger = () => {
  copyPrompt[0].classList.remove('copyPrompt-off')
  setTimeout(() => {
    copyPrompt[0].classList.add('copyPrompt-off')
  }, 2000)

}


  return (
    <div className="main">
      <div className="copyPrompt copyPrompt-off">
        <p>Password successfully copied to clipboard</p>
      </div>
      <div className="container">
        <div className="titleBox">
        <h1 className="title">Password Generator</h1>
        <div className="password-container">
          <span className="password-text">{password} </span>
          <FontAwesomeIcon icon={ faClipboard } className='icon' onClick={() => {
            navigator.clipboard.writeText(password);
            promptTrigger()
            }}/>
        </div>
        </div>
        <div className="row">
          <p>Password length</p>
          <input type="number"  onChange={(e) => (setLength(e.target.value))} className="inputNumber" defaultValue={10}/>
        </div>
        <div className="row">
          <p>Add Uppercase Letters</p>
          <input type="checkbox" className="checkbox" onClick={() => {
            uppercase === false ? setUppercase(true) : setUppercase(false) ;
          }}/>
        </div>
        <div className="row">
          <p>Add Lowercase Letters</p>
          <input type="checkbox" className="checkbox" onClick={() => {
            lowercase === false ? setLowercase(true) : setLowercase(false) ;
          }}/>
        </div>
        <div className="row">
          <p>Include Numbers</p>
          <input type="checkbox" className="checkbox" onClick={() => {
            number === false ? setNumber(true) : setNumber(false) ;
          }}/>
        </div>
        <div className="row">
          <p>Include Symbols</p>
          <input type="checkbox" className="checkbox" onClick={() => {
            symbol === false ? setSymbol(true) : setSymbol(false) ;
          }}/>
        </div>
        <button onClick={() => {generatePassword()}}>Generate</button>
      </div>
    </div>
  );
}

export default App;
