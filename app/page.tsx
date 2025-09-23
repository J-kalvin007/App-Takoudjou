"use client"

import { useState } from "react";
import { Divide, X } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import ReactLoading from "react-loading";
import { ClipLoader } from "react-spinners";

export default function Home() {

  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    try {

      const response = await fetch ("/api/abonne", {
        body : JSON.stringify ({email}),
        headers : {"Content-Type" : "application/json"},
        method: "POST",
      });

      if(response.ok){
        const data = await response.json()
        toast.success("Incription reussie")
        setEmail("")
      } else {
        const data = await response.json()
        toast.error(data.error || "Une erreur est survenue, veuillez reesayer!")
      }

      setIsloading(false);


    } catch (error) {

      toast.error("Une erreur est survenue, veuillez reesayer!")
      console.log(`VOICI L'ERREUR DANS LENOI DE L'EMAIL API ${error}`)

    }

    setIsloading(false);
    
  }


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-900">

      {/* Toast */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
      />
      
      <div className="flex items-center mb-6 md:w-[600px]">
        <div className="flex flex-col items-center w-full shadow-2xl rounded-2xl border-1 border-solid border-amber-500">
          <div className="h-[200px] w-full bg-positive bg-cover bg-center rounded-2xl mb-6">

          </div>

          <div className="w-full p-10 pt-0">
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Bienvenue TAKOUDJOU
            </h1>
            <p className="text-xl md:text-2xl font-bold text-white my-4">
              Inscripts-toi maintenant !
            </p>
            <p className="my-4 text-sm text-white">
              Ne manque plus jamais ton rendez-vous sacré : inscris-toi et ne laisse plus jamais passer ce moment béni avec ta famille et avec le Très-Haut.
            </p>

            {!isLoading ? (

              <form 
              className="flex items-center w-full"
              onSubmit={handleSubmit}
              >

              
              <div className="relative w-90">

                <input 
                  type="email" 
                  className="input input border w-full h-10 px-4 rounded-lg shadow-xl border-transparent outline-none bg-slate-50 focus:border-amber-500" 
                  placeholder="Entrer votre e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
                <X 
                  className="w-6 h-6 font-bold cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700" 
                  onClick={()=> setEmail("")}
                />

              </div>

              <button 
                className="bg-amber-300 w-30 h-10 rounded-[10px] mx-2 shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-110 font-semibold"
                type="submit"
              >
                Valider
              </button>

            </form>

            ) : (
              <div className="w-full flex items-center justify-center">
                
                <p className="text-lg text-white text-center">Chargement...⌛</p>
                <div>
                  <ClipLoader 
                    color="#f59e0b" 
                    loading={true} 
                    size={50} 
                  />
                </div>
                
              </div>
            )
          }


          </div>
          
        </div>
      </div>
      
    </div>
  );
}
