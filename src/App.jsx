import { Toaster } from "react-hot-toast";
import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom";

function App() {
  
  return (
    <>
    <div className="w-full h-screen overflow-hidden">
    <div className="w-full ">
      <Header />
    </div>
    <Toaster position="top-right" reverseOrder={false}  />
    <div className=" h-screen overflow-y-auto ">
      <main className="flex-1 ">
        <Outlet/>
      </main>
      <div className="w-full h-0.5  bg-[#251406f4] "></div>
      <div className=" ">
    <Footer/>
    </div>
    </div>
    
    </div>
    </>
  )
}

export default App
