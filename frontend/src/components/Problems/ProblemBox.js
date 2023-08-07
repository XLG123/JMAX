import "./ProblemBox.css"
const ProblemBox = ({ problem: { category,author,description } }) => {
  // const { username } = author;
  return (
    <div className="box">
      {/* <h3>{username}</h3> */}
      {/* <p>{category}</p> */}
      {/* <p>{description}</p> */}
      <h1> this is a req</h1>
      <button>Add Your Offer</button>
    </div>
  );
}

export default ProblemBox;