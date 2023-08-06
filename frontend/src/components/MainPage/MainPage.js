import webAppLogo from '../../assets/images/webAppLogo.jpg';
import './MainPage.css';

const MainPage = () => {
  
  const changeTitle = () => {
    let mainTitle = document.getElementById('title-last-letter');
    mainTitle.innerHTML = "D";
  }

  const resetTitle = () => {
    let mainTitle = document.getElementById("title-last-letter");
    mainTitle.innerHTML = "R";
  }

  return (
    <>
    <div className='main-pg-container'>

      <div className="title-container">
        <div className="drop-title">
          <span className='title-P'>P</span>
          <span className='title-R'>R</span>
          <span className='title-O'>O</span>
          <span className='title-B'>B</span>
          <span className='title-L'>L</span>
          <span className='title-E'>E</span>
          <span className='title-M'>M</span>
          <span className='title-space'> </span>
          <span className='title-S'>S</span>
          <span className='title-O'>O</span>
          <span className='title-L'>L</span>
          <span className='title-V'>V</span>
          <span className='title-E'>E</span>
          <span className='title-R' id="title-last-letter">R</span>
        </div>
      </div>

      <div className='main-pg-quote' onMouseEnter={changeTitle}
       onMouseLeave={resetTitle}>
        <p>
          <span>Helpers </span>
          <span>are </span> 
          <span>on </span> 
          <span>the </span> 
          <span>way, </span> 
          <span>you </span> 
          <span>are </span> 
          <span>not </span> 
          <span>alone.</span>
        </p>
      </div>
    </div>
    </>
  );
}

export default MainPage;