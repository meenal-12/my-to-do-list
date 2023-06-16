import React, { useEffect, useState } from 'react'
import "./style.css"

const getLocalData=()=>{
  const lists = localStorage.getItem("mytodoList");
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}
const ToDoList = () => {

   const [inputData,setinputData] = useState("");
   const [itemsList,setItemList] = useState(getLocalData());
   const [edititem,setEditItem] = useState("");

   const [toggleButton,settoggleButton] = useState(false);
   
   const addItem = () => {
     if(!inputData){
      alert('fill the Data');
      }
      else if(inputData && toggleButton){
         setItemList(itemsList.map((curElem)=>{
              if(curElem.id === edititem){
                return { ...curElem,name:inputData}
              }
              return curElem;
         }));
         setinputData("");
         setEditItem(null);
         settoggleButton(false);
      }
      else{
      const myNewInputData = {
        id:new Date().getTime().toString(),
        name:inputData,
      };
      setItemList([...itemsList,myNewInputData]);
      setinputData("")
     }
   }
   const deleteItem = (index ) => {
     const updatedItem = itemsList.filter((curElem)=>{
               return curElem.id !== index;
     });
     setItemList(updatedItem);
  }
  const remove = () =>{
    setItemList ([]);
  }
  const editItem = (index) =>{
     
    const curItem = itemsList.find((curElem)=>{
      return curElem.id === index;
    });
    setinputData(curItem.name);
    setEditItem(curItem.id);
    settoggleButton(true);
    
    // console.log(index)
    // const curItem = itemsList.find((curElem)=>{
    //   return curElem.id === index;
    // });
    // setinputData(curItem.name);
    // const button = document.getElementById("myButton");

}
  useEffect(()=>{
    localStorage.setItem("mytodoList",JSON.stringify(itemsList));
  },[itemsList])
  return (
   <>
    <div className='main-div'>
      <div className='child-div'>
        <figure>
          <img src="./todo.svg" alt="todolist" />
          <figcaption>Add Your List Here 😊✍</figcaption>
        </figure>
        <div className='add-items'>
          
          <input type="text" placeholder='write your text here 👵' className='form-control'
          value={inputData} onChange={(event)=>setinputData(event.target.value)}
          />
          { 
          toggleButton?(<i className="far fa-edit add-btn" onClick={addItem}></i>):(<i className="fa fa-plus add-btn" onClick={addItem}></i>)
          }

        
        </div>
        <div className='showItems'>
           {/* <div className='eachItem'>
            <h3>apple</h3>
            <div className='todo-btn'>
            <i className="far fa-edit add-btn" ></i>
            <i className="far fa-trash-alt add-btn" ></i>
            </div>
           </div> */
           itemsList.map((curElem,index) => {
                      return(
                      <div className='eachItem' key={index}>
                      <h3>{curElem.name}</h3>
                      <div className='todo-btn'>
                      <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={() =>deleteItem(curElem.id)} ></i>
                      </div>
                     </div>)
           })}
         
        </div>
        <div className='showItems'>
            <button className='btn effect04' data-sm-link-text='Remove All' onClick={remove}> <span>
            CHECK LIST</span></button>
        </div>
      </div>
    </div>
   </>
  )
}

export default ToDoList
