import Sidebar from "./Sidebar";

export default function OpenUp(){
    return(
        <>
        <div className="bg-black flex justify-center items-center h-screen w-screen">
<Sidebar
    user={null}
    setUser={() => {}}
    setRoom={() => {}}
    setRoomType={() => {}}
  />

        </div>
        
        </>
    )
}