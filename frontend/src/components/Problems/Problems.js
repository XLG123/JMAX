import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as problemActions from "../store/problems"
import ProblemBox from './ProblemBox';

const Problems = () => {
  debugger
  const dispatch = useDispatch();
  const problems = useSelector(state => Object.values(state.problems.all));

  useEffect(() => {
    dispatch(problemActions.fetchProblems());
    return () => dispatch(problemActions.clearProblemErrors());
  }, [dispatch])

  if (problems.length === 0) return <div className='noproblem'>There are no Problems</div>;

  return (
    <div className='container'>
      <h2 className='title'>All Problems</h2>
      {problems.map(problem => (
        <ProblemBox key={problem._id} problem={problem} />
      ))}
    </div>
  );
}

export default Problems;