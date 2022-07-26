import React, {useState,useEffect} from 'react'



import {QrReader, QrScan} from 'react-qr-reader'
import NavbarF from '../navbar/NavbarF'
function QRCF() {
  const [data, setData] = useState('No result');
    const [qrscan, setQrscan] = useState('No result');
    
    //const [error,setError] = useState("");
    const [records, setRecords] = useState([]);

    let item = {
      type:"",
      name:"",
      warranty:"",
      manufdate:"",
      department:"",
      roomno:"",
      id:""
    }
    const getData = () => {
      for(var key in records){
        if(records[key].id === data){
          item.type = records[key].type;
          item.id = records[key].id;
          item.manufdate = records[key].manufdate
          item.warranty = records[key].warranty
          item.name = records[key].name
          item.department = records[key].Department
          item.roomno = records[key].RoomNo
          break;
        }
     
       
      } 
      
    }
    const printdata = () =>{
      return(
        <><label htmlFor='ID'>ID of the Product :</label>
        <input type="text" value={item.id} className="id" readOnly />
        <label htmlFor='type'>Type :</label>
        <input type="text" value={item.type} className="id" readOnly />   
        <label htmlFor='name'>Name :</label>
        <input type="text" value={item.name} className="id" readOnly /> 
        <label htmlFor='manufdate'>Manufacture :</label>
        <input type="text" value={item.manufdate} className="id" readOnly />   
        <label htmlFor='Warranty'>Warranty :</label>
        <input type="text" value={item.warranty} className="id" readOnly /> 
        <label htmlFor='Department'>Department :</label>
        <input type="text" value={item.department} className="id" readOnly />
        <label htmlFor='roomno'>Room No :</label>
        <input type="text" value={item.roomno} className="id" readOnly />
        </>
      )
    }
    const handleScan = data => {
       if (data) {
             setQrscan(data);
             getData();
             //printdata();
         }
    }
    const handleError = err => {
    console.error(err)
    }
   
    useEffect(() => {
      async function getRecords() {
        const response = await fetch("http://localhost:5000/record/facility");
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        setRecords(records);
      }
    
      getRecords();
    
      return;
    }, [records.length]);
    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
      // 👇️ only show element on click
      setIsShown(current => !current);
    };
    
    const [isShn, setIsShn] = useState(false);
    const handleCli = event => {
      // 👇️ only show element on click
      setIsShn(current => !current);
    };
    

    return (
      <div>
        <NavbarF/>
            
            
            
      <div className='div2'>
   
      <div className='div3'>
      <button onClick={handleClick} className="btn">Scan</button>
      {isShown && (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            getData();
            //printdata();
          }
  
          if (!!error) {
            console.info(error);
          }
        }}
        onError={handleError}
        onScan={handleScan}
        className='qrreader'
      />
        
    <label htmlFor='ID'>ID of the Product:</label>
    <input type="text" value={data} className="id" onChange={getData()} readOnly/>
    
    <button onClick={handleCli} className="btn">Show Details</button>
    </div>
  )}

  
  
  </div>
             
            
  {isShn && (      
     <div className='text'>
           {printdata()}
      </div>)}
      </div></div>
    );
  }
  
  export default QRCF;