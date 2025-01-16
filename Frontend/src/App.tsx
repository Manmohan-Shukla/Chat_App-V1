
import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {

  const [message, setMessage] = useState(["Hi There", "Hello"]);
  const wsRef = useRef();
  const inputRef=useRef();
  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessage(m => [...m, event.data])
    }
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
    // return ()=>{
    //   ws.onclose()
    // }
  }, [])
  return (
    <div className='h-screen bg-black '>
      <div className='h-[90vh] '>
        <br /><br /><br />
        {message.map(message =>
          <div className='m-8'>
            <span className='bg-white text-black 
              p-3.5 rounded '>{message}
            </span>
          </div>)}
      </div>
      <div className='w-full bg-white flex '>
        <input type='text ' ref={inputRef} id='message' className='flex-1 p-4' placeholder='input' />
        <button onClick={() => {
          // const message=ref.current.value;
          const message = inputRef.current?.value;
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: message
            }
          }))
        }} className='bg-purple-400 text-white p-4'> Send Message</button>
      </div>
    </div>
  )
}

export default App
