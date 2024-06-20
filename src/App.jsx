import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)



  }, [length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(()=>{
    // passwordRef.current?.select()  // when click copy button then select the password automatically 
    // passwordRef.current?.setSelectionRange(0,8);    // For select specifit range of password
    window.navigator.clipboard.writeText(password)
    document.querySelector('#copybtn').innerHTML = 'Copied'
    setTimeout(() => {
    document.querySelector('#copybtn').innerHTML = 'Copy' 
    }, 1000);
  },[password])

  // const copied = ()=>{document.querySelector('#copybtn').addEventListener(()=>{
  //   document.querySelector('#copybtn').innerHTML = 'Copied'
  // })
  // }

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md Obg-gray-700 rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input type="text" value={password} placeholder='Password' className='outline-none w-full py-1 px-3' ref={passwordRef} />
          <button id='copybtn' className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500' onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={20} value={length} className='cursor-pointer ' onChange={(e) => { setLength(e.target.value) }} />
            <label > Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={(e)=>{setNumberAllowed((prev) => !prev);}} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='CharInput' onChange={(e)=>{setCharAllowed((prev) => !prev);}} />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>


      </div>
    </>
  )
}

export default App
