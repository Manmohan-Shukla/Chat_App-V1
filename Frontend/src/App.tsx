
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ChatIcon } from './assets/chatIcon';
import { DuplicateIcon } from './assets/duplicateIcon';
import { Button } from './button';



function App() {

  const [message, setMessage] = useState([]);
  const wsRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    const ws = new WebSocket("https://chat-app-v1-rj23.vercel.app/");
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
    <div className='h-screen bg-stone-950   flex justify-center items-center  '>
      <div className="rounded-xl border bg-card border-zinc-800 shadow w-full w-[40vw] justify-center px-4 ">


      <div> 
        <div className='flex items-center '>
        <div className='text-white px-2 pt-4 '><ChatIcon/></div>
        <div className='text-white text-3xl  mt-4 ibm-plex-mono-bold'>Real Time Chat</div>
        
        </div>
        <div className='text-zinc-600 ibm-plex-mono-medium pl-2 mb-2'>temporary room that expires after all users exit</div>
        <div className='text-zinc-600 h-10 ibm-plex-mono-medium
         rounded-lg bg-zinc-900 pl-4 flex items-center '>Room Code: RED<DuplicateIcon/><div></div></div>
      </div> 



        <div className='h-[45vh] bg-zinc-900 my-4 rounded-lg overflow-auto'>
          <br />
          {message.map(message =>
            <div className='m-4'>
              <span className='bg-white text-black 
              px-3 py-2 inline-block rounded-lg mt-0.5 ibm-plex-mono-medium
               textContainer tracking-widest leading-none ' >{message}
              </span>
            </div>)}
        </div>
        <div className=' flex  align-center '>
          <div className='w-5/6 mb-4'> <input type='text ' ref={inputRef} id='message' className=' p-2 text-white 
          w-full bg-zinc-900 rounded-md border-zinc-800' placeholder='Type a message ...' />
          </div>
          <div className='w-1/6 mb-4'><Button text="Send" onClick={() => {
            // const message=ref.current.value;
            const message = inputRef.current?.value;
            wsRef.current.send(JSON.stringify({
              type: "chat",
              payload: {
                message: message
              }
            }))
          }} > Send</Button></div>
        </div>
      </div>
    </div>
  )
}

export default App
