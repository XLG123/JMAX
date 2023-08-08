import "./ProblemBox.css"
import { useState } from 'react';
import Modal from "../context/model"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ProblemBox = ({ problem: { category,author,description } }) => {
  const [show,setShow]=useState(false)
  const [price,setPrice]=useState()
  const [offer,setOffer]=useState("")
  const history=useHistory()
  const { username ,_id } = author;
  function handelSubmit(e){
    e.preventDefault()
  }
  function sendToProf(){
    history.push(`/users/${_id}`)
  }
  return (
    <>
    <div className="problems-container">

    <div className="box">
      <h3 onClick={sendToProf}>{username}</h3>
      <p className="catgory">{category}</p>
      <p className="des-box">{description}</p>
     <div className="offer"><button className="add-offer-btn" onClick={()=>setShow(true)}> Offer Help</button></div> 
    </div>
    </div>
    {show&& <Modal onClose={()=>setShow(false)}>
<h1 className="title">What is your offer!</h1>
{/* <br/> */}
<form onSubmit={handelSubmit}>
<input type="text"
    onChange={(e)=> setOffer(e.target.value)}
    className='signup-input'
    placeholder="My Offer is ...."
    required
  />
<input type="number"
    onChange={(e)=> setPrice(e.target.value)}
    className='signup-input'
    placeholder="Price"
    required
  />

<button className="sign-up-btn ">Add Offer</button>

</form>
      </Modal>}
    </>
  );
}

export default ProblemBox;