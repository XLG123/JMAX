import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as problemActions from "../store/problems"
import ProblemBox from './ProblemBox';

const Problems = () => {
  const dispatch = useDispatch();
  const problems = useSelector(state => Object.values(state.problems.all));

  useEffect(() => {
    dispatch(problemActions.fetchProblems());
    return () => dispatch(problemActions.clearProblemErrors());
  }, [dispatch])

  if (problems.length === 0) return <div>There are no Problems</div>;

  return (
    <>
      <h2>All Problems</h2>
      {problems.map(problem => (
        <ProblemBox key={problem._id} problem={problem} />
      ))}
    </>
  );
}

export default Problems;