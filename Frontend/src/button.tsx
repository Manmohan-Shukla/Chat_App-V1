export function Button({onClick,text,}){
    return(
        <div>
            <button onClick={onClick}className='bg-white text-gray-900 w-full mx-2 py-2 px-6 ibm-plex-mono-medium tracking-widest rounded-lg  '>{text}</button>
        </div>

    )
}