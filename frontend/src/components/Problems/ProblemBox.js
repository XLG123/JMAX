// import "./ProblemBox.css"
const ProblemBox = ({ problem: { category,author,description } }) => {
  // const { username } = author;
  return (
    <div className="problem">
      {/* <h3>{username}</h3> */}
      <p>{category}</p>
      <p>{description}</p>

    </div>
  );
}

export default ProblemBox;