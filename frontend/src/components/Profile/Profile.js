import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../store/session"
// import { fetchUserProblems, clearProblemErrors } from '../../store/problems';
// import ProblemBox from '../Problems/ProblemBox';
import "./Profile.css";
import ProblemBox from '../Problems/ProblemBox';
import { clearProblemErrors, fetchProblems, fetchUserProblems } from '../store/problems';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const userId = useParams().userId;
  // const [user,setUser]=useState()
  const dispatch = useDispatch();
   let users = useSelector(state => state.session.users);
  // console.log(users);
  if (!users){
    users={}
  }
  const user = users[userId]
  // console.log(user);
  // console.log(userId);
  const currentUser = useSelector(state => state.session.user);
  const allProblems = useSelector(state => Object.values(state.problems.all));
  const userProblemIds = 
    useSelector(state => state.problems.userProblems)
    // console.log(userProblemIds);

  useEffect(() => {
    dispatch(sessionActions.fetchAllUsers())
    dispatch(fetchProblems());
    dispatch(fetchUserProblems(userId));
    return () => dispatch(clearProblemErrors());
  }, [dispatch]);

  if (!userProblemIds) {
    return [];
  }
  if (!users) return null
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
          {allProblems
            .filter((problem) => userProblemIds.includes(problem._id))
            .map((problem)=> (<ProblemBox key={problem._id} 
              problem={problem}/>))}
        </div>

        <div className="pg-right-side-bar">
          <h1>{user?.username}</h1>
          <h1>{user?.email}</h1>
          {/* <h1>{currentUser.address}</h1>
          <h1>{currentUser.age}</h1> */}
        </div>

      </div>
    </>
  );
}

export default Profile; 