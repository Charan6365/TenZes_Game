import { useState } from "react";
import Dice from "./components/Dice.jsx";
import Confetti from "react-confetti"
import "./App.css";

export default function App() {
  const [arr, setArr] = useState(rand());
  const [num,setNum] = useState({flag:false,number:0})
  const [won,setWon] = useState(false)
  console.log(num.number+" "+num.flag);

  function rand() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
                    id: i,
                    isHeld: false,
                    value:Math.ceil(Math.random() * 6)
                  });
    }
    return newDice;
  }

  function changer() {
    if(won){
      setArr(rand())
      setNum({flag:false,number:0})
      setWon(prev=>!prev)
    }
    else{setArr((prevData)=>{
      return prevData.map((obj)=>{
        if(!obj.isHeld) return {...obj,value:Math.ceil(Math.random() * 6)}
        return obj;
      })
    });}
  }

  function hold(id){
    // console.log(id);
    setArr((prevData)=>{
      return prevData.map((a)=>{
        if(a.id===id)
          {
          if(!num.flag){
          setNum((prev)=> {return {flag:!prev.flag,number:a.value}})
          return {...a,isHeld: !a.isHeld}
          }
         else if(a.value===num.number){
          return {...a,isHeld: !a.isHeld}
         }
        }
         return a
        })
    })
    setWon((prev)=>{
      for(let i=0;i<arr.length;i++){
        if(arr[i].value!==num.number) return prev;
      }
    return !prev;
    })
    // console.log(id);
  }

  const allDice = arr.map((a) => <Dice key={a.id} id={a.id} value={a.value} held={a.isHeld} hold={hold} />);

  return (
    <div className="body">
      {won && <Confetti />}
      <div className="main">
        <h1>TenZies</h1>
        <p className="top">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">{allDice}</div>
        <button className="change" onClick={changer}>
          {(won)?"New Match":"Roll Dice"}
        </button>
      </div>
    </div>
  );
}
