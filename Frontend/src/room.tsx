import { ChatIcon } from "./assets/chatIcon";
import { Button } from './button';
export function RoomId(){
    return(
        <>
        <div>
        
              <div> 
                <div className='flex items-center '>
                <div className='text-white px-2 pt-4 '><ChatIcon/></div>
                <div className='text-white text-3xl  mt-4 ibm-plex-mono-bold'>Real Time Chat</div>
                
                </div>
                <div className='text-zinc-600 ibm-plex-mono-medium pl-2 mb-2'>temporary room that expires after all users exit</div>
              </div> 


<div><Button text="Create New Room" ></Button></div>
<div><input type='text '  id='message' className=' p-2 text-white w-full bg-zinc-900 rounded-md border-zinc-800' placeholder='Enter your name' /></div>
<div>
    <div><input type='text '  id='message' className=' p-2 text-white w-full bg-zinc-900 rounded-md border-zinc-800' placeholder='Type a message ...' /></div>
    <div><Button text="Join Room"></Button></div>
</div>

              </div>
        </>
    )
}