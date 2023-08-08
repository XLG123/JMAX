import "./ProblemBox.css"
import { useState } from 'react';
import Modal from "../context/model"
const OfferBox = ({ offer: {description ,price,status} }) => {
  const [show,setShow]=useState(false)
  const [price,setPrice]=useState()
  const [offer,setOffer]=useState("")
  const { username } = helperId;
  function handelSubmit(e){
    e.preventDefault()
  }
  return (
    <>
    <div className="problems-container">

    <div className="box">
      <h3>{username}</h3>
      <p className="catgory">{status}</p>
      <p className="des-box">{price}</p>
      <p className="des-box">{description}</p>

    </div>
    </div>
<form onSubmit={handelSubmit}>
<button className="sign-up-btn ">Accept Offer</button>
</form>
    </>
  );
}

export default OfferBox;