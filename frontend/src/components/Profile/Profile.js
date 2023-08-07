import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProblems, clearProblemErrors } from '../../store/problems';
// import ProblemBox from '../Problems/ProblemBox';
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  // const currentUser = useSelector(state => state.session.user);
  // const userProblems = useSelector(state => Object.values(state.problems.user))

  // useEffect(() => {
  //   dispatch(fetchUserProblems(currentUser._id));
  //   return () => dispatch(clearProblemErrors());
  // }, [currentUser, dispatch]);

  // if (userProblems.length === 0) {
  //   return <div>{currentUser.username} has no problems</div>;
  // } else {
  //   return (
  //     <>
  //       <h2>All of {currentUser.username}'s Problems</h2>
  //       {userProblems.map(problem => (
  //         <ProblemBox
  //           key={problem._id}
  //           problem={problem}
  //         />
  //       ))}
  //     </>
  //   );
  // }
  return (
    <>
    {/* pg stands for profile page */}
      <div className='pg-container'>

        <div className='pg-left-side-bar'>
          hi from left side bar
        </div>

        <div className="pg-middle-section">
          hi from middle section
        </div>

        <div className="pg-right-side-bar">
          hi from right side bar
        </div>

      </div>
    </>
  );
}

export default Profile;