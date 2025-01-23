
import './App.css'
import{React} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
function App() {

  const[url,setUrl] = useState()
  const[file,setFile] = useState()

  //  useEffect(async()=>{
    
     
  //  },[])
 
  //  const send = async (e) =>{
  //   e.preventDefault()
  //   //  .then((res)=>console.log(res))
  //   //  .then((res)=>console.log(res.data))
  //   //  .then((res) => {setUrl(res.data)})
      
  //  }
    const sendFile =async (event)=>{
      event.preventDefault()
      const res =await axios.get("http://localhost:8000/")
      setUrl(res.data)
      console.log(`url : ${url}`)
      const formdata = new FormData();
      formdata.append("image",file)
      formdata.append("filename",file.name)
       const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': 'false',
          'content-type': 'multipart/form-data',
        },
      };
      await axios.put(url,formdata,config).then((response) => {
        console.log(response.data)
      })
    }
  return (
    <>
    <div>
     <form action="/action_page.php" onSubmit={sendFile} >
     <input type="file" id="myFile" onChange={(e)=>{setFile(e.target.files[0])}} name="filename"/><br/>
     <button type="submit" className="mt-5 px-8 py-2 bg-cyan-500 text-red-700 rounded-xl border-black border-4"
     >Submit</button>
     </form>
     </div>
    </>
  )
}

export default App
