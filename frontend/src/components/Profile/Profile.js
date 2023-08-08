import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProblems, clearProblemErrors } from '../../store/problems';
// import ProblemBox from '../Problems/ProblemBox';
import "./Profile.css";
import ProblemBox from '../Problems/ProblemBox';
import { clearProblemErrors, fetchUserProblems } from '../store/problems';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userProblems = useSelector(state => Object.values(state.problems.user))

  useEffect(() => {
    dispatch(fetchUserProblems(currentUser._id));
    return () => dispatch(clearProblemErrors());
  }, [currentUser, dispatch]);

  // }
  return (
    <>
    {/* pg stands for profile page */}
      <div className='pg-container'>

        <div className='pg-left-side-bar'>
          <div className='pg-filter-gp'>
            <div className='pg-filter-btn'>ALL</div>
            <div className='pg-filter-btn'>Requester</div>
            <div className='pg-filter-btn'>Helper</div>
          </div>
        </div>

        <div className="pg-middle-section">
          {userProblems.length === 0 ? 
            <div>{currentUser.email} has no problems</div> : 
            <>
              <h2>All of {currentUser.email}'s Problems</h2>     {userProblems.map(problem => (
                  <ProblemBox
                    key={problem._id}
                    problem={problem}
                  />
                ))}          
            </>}
        </div>

        <div className="pg-right-side-bar">
          <h1>{currentUser.username}</h1>
          <h1>{currentUser.email}</h1>
          {/* <h1>{currentUser.address}</h1>
          <h1>{currentUser.age}</h1> */}
        </div>

      </div>
    </>
  );
}

export default Profile; 