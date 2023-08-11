import webAppLogo from '../../assets/images/webAppLogo.jpg';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <div className="splash-container">
        <div className='image-container'>
          <img src={webAppLogo} alt='app-logo' className='splash-logo' />
        </div>

        <div className='app-description'>

        </div>

        <div className='team-members-info'>
          
        </div>
      </div>
    </>
  );
}

export default AboutPage;