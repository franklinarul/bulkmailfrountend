import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import * as XLSX from "xlsx"
function App() {
  const[mesg,setmesg]=useState("")
  const[response,setresponse]=useState(false)
  const[emaillists,setemaillist]=useState([]);
  
  function handlemsg(event){
   
    setmesg(event.target.value)
    
  }

  function sendingemail(){
   setresponse(true)
    axios.post("https://bulkmailbackend-yj6s.onrender.com/sendmail",{msg:mesg,emails:emaillists})
    .then(function(body){
      if(response === body.body){
        alert("msg error")
      }else{
        alert("msg succcessfuly send")
        setresponse(false);
      }
      
    });
    setmesg("")
  }

  function uplodingfile(event){
    const file =event.target.files[0];

    const reader = new FileReader();

    reader.onload = function(e){
        const data = e.target.result;
        const workbook = XLSX.read(data,{type:"binary"})
        const sheetnames = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetnames];
        const emaillist = XLSX.utils.sheet_to_json(worksheet,{header:"A"})
        const emails = emaillist.map(function(items){return items.A})
        console.log(emails)
        setemaillist(emails) 
    }
    reader.readAsBinaryString(file);

  }

  return (
    <>
     <div className='bg-blue-950 text-2xl text-white text-center p-5'><h1>Bulk mail</h1></div>
     <div className='bg-blue-600 text-2xl text-white text-center p-5'><h1>we help your business with sending multiple emails at once</h1></div>
     <div className='bg-blue-400 text-2xl text-white text-center p-5'><h1>drag and drop</h1></div>
     <div className='bg-blue-300  text-black p-5 flex flex-col  items-center'>
      <textarea value={mesg} onChange={handlemsg} className='w-[80%] h-32' name="" id="" placeholder='enter the email text'></textarea>
      <input onChange={uplodingfile} className='mt-5 p-2 border-4 border-dashed  '  type="file" name="" id="" />
      <p className='text-black text-xl'>total number of emails in the file {emaillists.length}</p>
      <button onClick={sendingemail} className='rounded bg-black text-white p-2'>{response?"sending..":"send"}</button>
     </div>
       <div className='bg-blue-400 text-2xl text-white text-center p-20'></div>
      <div className='bg-blue-600 text-2xl text-white text-center p-20'></div>
    </>
  )
}

export default App
