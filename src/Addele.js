import React,{useState}  from 'react'
function Addele() {
    const [uname,setUname]=useState("");
    const [ar,setAr]=useState(["sita","geetha","anu"])
    const addname=(e)=>{
        setUname(e.target.value)
    }
    const add=()=>{
      setAr(prev=>[...prev,uname])
      setUname("")
    }
   const remove=(item)=>{
     setAr(prevAr=>prevAr.filter((e) => e !== item))
   }
    
  return (
    <div>
        <input type="text" placeholder="Enter value" value={uname} onChange={addname}/>
        <button onClick={add}>add</button>
        {
            ar.map(item=>(
                <div>
                    {item}
                    <button onClick={()=>remove(item)}>Delete</button>
                    
                </div>
            
            ))}  
    </div>
  )
}

export default Addele



