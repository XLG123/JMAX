import "./ProblemBox.css"
const ProblemBox = ({ problem: { category,author,description } }) => {
  // const { username } = author;
  return (
    <div className="problems-container">

    <div className="box">
      {/* <h3>{username}</h3> */}
      <p className="catgory">{category}</p>
      <p className="des-box">{description}</p>
     <div className="offer"><button className="add-offer-btn"> Offer Help</button></div> 
    </div>
    </div>
  );
}

export default ProblemBox;