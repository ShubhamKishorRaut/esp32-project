import './App.css'
import{React, useCallback} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import useWebSocket from 'react-use-websocket'
function App() {

  const{lastMessage,sendMessage} = useWebSocket("wss://keeyfngkid.execute-api.us-east-1.amazonaws.com/development")

  const[bname,setBname] = useState()
  const[file,setFile] = useState()
  const[name,setName] = useState("ESP32-WROOM-DA module")
  const[col,setCol]=useState("text-red-700")
  const[dis,setDis]=useState("hidden") 
  const[con,setCon]=useState("disconnected")
  const[val,setVal]=useState("")
  const[res,setRes]=useState("")
  const[temp,setTemp]=useState("")
  const[humi,setHumi]=useState("")
   useEffect(()=>{
    if (lastMessage === null){
      return;
    } 
     
    // sendMessage(JSON.stringify({
    //   action:"send",
    //   url:""
    // }))
      
      const parsedMessage =JSON.parse(lastMessage.data) 
      if(parsedMessage.url!=null)
      {
        const formdata = new FormData();
        formdata.append(".bin",file)
        formdata.append("filename",file.name)
        // formdata.append('file', binaryData, file.name);
  
         const config = { 
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'false',
            'Contetnt-Type':'multipart/form-data'        
          },
        };
        axios.put(parsedMessage.url,formdata,config).then((response) => {
          console.log(response.data)
        })
        
      }
      // console.log(`parsedMessage : ${parsedMessage.url}`)
      // setUrl(parsedMessage.url)
      // console.log(Url)
  
      if(parsedMessage.name =="ESP32-WROOM-DA module")
        {
             setName(parsedMessage.name)
             setCol("text-green-600 font-bold text-2xl")
             setCon("Connected")
        }
       if(parsedMessage.temp !=null && parsedMessage.humi != null)
       {
          setTemp(parsedMessage.temp)
          setHumi(parsedMessage.humi)
       }
    },[lastMessage])
    // useEffect(()=>{
    //   console.log(`url : ${url}`)
    // })
  //  const send = async (e) =>{
  //   e.preventDefault()
  //   //  .then((res)=>console.log(res))
  //   //  .then((res)=>console.log(res.data))
  //   //  .then((res) => {setUrl(res.data)})
      
  //  }

    const display = (e)=>{
      if( e.target.value==1){
        setVal("1")
        setDis("")
      }else if(e.target.value==2){
        setVal("2")
        setDis("")
      }
    }

    const sendFile =async (event)=>{
      event.preventDefault()
       if(val==1)
       {
        setRes("f1")
        sendMessage(JSON.stringify({
          action:`${res}`,
        }))
       }else{
        setRes("f2")
        sendMessage(JSON.stringify({
          action:`${res}`,
        }))
       }   
    
      // const parsedMessage = await JSON.parse(lastMessage.data)
      // console.log(parsedMessage)
      // setUrl(parsedMessage.url)
      // console.log(`url : ${url}`)

      // const res =await axios.get("http://localhost:8000/")
      // setUrl(res.data)
      
      
    }
  return (
    <>
    <div className=''>
      <div className='bg-slate-800 w-full h-24'>
       <h1 className='text-4xl text-red-600 pt-5 mb-10 text-center'>OTA with STM32</h1>
      </div>
      <div className={`${col} mt-10 text-center`}>
      {name}---{con}
      </div>
     <form action="/action_page.php" onSubmit={sendFile} className={` mt-8 text-center bg-red-400 h-40`} >
     <div className='pt-2'>
       <select onChange={display}>
        <option>Select File to Upload</option>
        <option value="1" >Firmware 1</option>
        <option value="2">Firmware 2</option>
        </select>
     </div>
     <div className={`${dis}`}>
     <input type="file" id="myFile" className='mt-4' onChange={(e)=>
      {setFile(e.target.files[0])
      // sendMessage(JSON.stringify({
      //   action:"send",
      //   url:""
      // }))
      }
    }
       name="filename"/><br/>
     <button type="submit" className="mt-5 px-8 py-2 bg-cyan-500 text-red-700 rounded-xl border-black border-4 hover:bg-cyan-300 
     hover:font-bold"
     >Upload File</button><br/>
     </div>
     </form>
     <div className='flex col '>
     <div className='text-center bg-orange-300 w-1/2'>
      <h1 className='pt-2 text-2xl text-orange-700'>Select Program to Flash</h1>
     <button className='mt-5 px-8 py-2  bg-purple-600 text-yellow-400 rounded-xl border-black border-4 hover:bg-purple-900 hover:font-bold' onClick={()=>{
      sendMessage(JSON.stringify({
        action:"send",
        name:1
      }))
     }}>Flash Core 1</button><br/>
     <button className='mt-5 mb-4 px-8 py-2 bg-purple-600 text-yellow-400 rounded-xl border-black border-4 hover:bg-purple-900 hover:font-bold' onClick={()=>{
      sendMessage(JSON.stringify({
        action:"send",
        name:2
      }))
     }}>Flash Core 2</button>
     </div>
     <div className='text-center bg-blue-300 h-72 pt-5 w-1/2'>
      <h1 className='text-4xl text-red-900'>Select Mode</h1>
      <button className='mt-5 px-8 py-2  bg-red-600 text-yellow-400 rounded-xl border-black border-4 hover:bg-red-900 hover:font-bold' >Run Mode</button><br/>
      <button className='mt-5 px-8 py-2 mb-4 bg-red-600 text-yellow-400 rounded-xl border-black border-4 hover:bg-red-900 hover:font-bold'>Bootloader</button>
     </div>
     </div>
     <div className='text-center bg-yellow-600 h-72 pt-5'>
      <h1 className='text-4xl text-red-900 mb-4'>Sensor Data</h1>
      {/* <button className='mt-5 px-8 py-2  bg-red-600 text-yellow-400 rounded-xl border-black border-4 hover:bg-red-900 hover:font-bold' >Run Mode</button><br/>
      <button className='mt-5 px-8 py-2 mb-4 bg-red-600 text-yellow-400 rounded-xl border-black border-4 hover:bg-red-900 hover:font-bold'>Bootloader</button> */}
      <h2 className='text-2xl text-cyan-950 font-semibold mr-14'>Temperature :- {temp}</h2><br/>
      <h2 className='text-2xl text-cyan-950 font-semibold mr-14'>Humidity :- {humi} </h2><br/>
     </div>
     
     </div>
    </>
  )
}

export default App
