import './MainPage.css';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const MainPage = () => {
  
  const turnOnHoverEffect = () => {
    let mainTitle = document.getElementById('title-last-letter');
    mainTitle.innerHTML = "D";

    let lightBulb = document.getElementById("light-bulb");
    lightBulb.style.display = "";
  }

  const turnOffHoverEffect = () => {
    let mainTitle = document.getElementById("title-last-letter");
    mainTitle.innerHTML = "R";  

    let lightBulb = document.getElementById("light-bulb");
    lightBulb.style.display = "none";
  }

  return (
    <>
    <div className='main-pg-container'>

      <div className='lightbulb-icon'>
        <EmojiObjectsIcon id='light-bulb'/>
      </div>

      <div className="title-container">
        <div className="drop-title">
          <div className='title-letter letter-1'>P</div>
          <div className='title-letter letter-2'>R</div>
          <div className='title-letter letter-3'>O</div>
          <div className='title-letter letter-4'>B</div>
          <div className='title-letter letter-5'>L</div>
          <div className='title-letter letter-6'>E</div>
          <div className='title-letter letter-7'>M</div>
          <div className='title-letter letter-8'>
            &nbsp;&nbsp;&nbsp;
          </div>
          <div className='title-letter letter-9'>S</div>
          <div className='title-letter letter-10'>O</div>
          <div className='title-letter letter-11'>L</div>
          <div className='title-letter letter-12'>V</div>
          <div className='title-letter letter-13'>E</div>
          <div className='title-letter letter-14' 
            id="title-last-letter">R</div>
        </div>
      </div>

      <div className='main-pg-quote' onMouseEnter={turnOnHoverEffect}
       onMouseLeave={turnOffHoverEffect}>
        <p>
          <span>Helpers are on the way you are not alone.</span>
        </p>
      </div>
    </div>
    </>
  );
}

export default MainPage;