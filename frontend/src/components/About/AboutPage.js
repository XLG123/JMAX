import webAppLogo from "../../assets/images/webAppLogo.jpg";
import avatar1 from "../../assets/images/avatar1.png";
import avatar2 from "../../assets/images/avatar2.png";
import avatar3 from "../../assets/images/avatar3.png";
import avatar4 from "../../assets/images/avatar4.png";
import "./AboutPage.css";
import Avatar from "@mui/material/Avatar";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const AboutPage = () => {
  const gitHubLinks = [
    "https://github.com/j-corp-25",
    "https://github.com/Manel-Oulds",
    "https://github.com/AsmaaEliwa",
    "https://github.com/XLG123",
  ];

  const linkedInLinks = [
    "https://www.linkedin.com/in/jcorporan/",
    "https://www.linkedin.com/in/manel-ould-saada/",
    "https://www.linkedin.com/in/asmaa-eliwa-38a38621a/",
    "https://www.linkedin.com/in/xiaolinguan/"
  ];

  const portfolioLinks = [
    "https://j-corp-25.github.io/Portfolio/",
    "https://manel-oulds.github.io/",
    "https://asmaaeliwa.github.io/",
    "https://xlg123.github.io/"
  ];

  const lightUpJMAX = () => {
    const j = document.getElementById("change-J");
    const m = document.getElementById("change-M");
    const a = document.getElementById("change-A");
    const x = document.getElementById("change-X");

    const letterGlowUp = (j, m, a, x) => {
      j.style.textShadow = "0px 0px 20px #fff";
      m.style.textShadow = "0px 0px 20px #fff";
      a.style.textShadow = "0px 0px 20px #fff";
      x.style.textShadow = "0px 0px 20px #fff";

      j.style.color = "white";
      m.style.color = "white";
      a.style.color = "white";
      x.style.color = "white";
    };

    let avatars = document.getElementsByClassName("member-avatar");
    for (let i = 0; i < 4; ++i) {
      avatars[i]?.addEventListener("onMouseEnter", letterGlowUp(j, m, a, x));
    }
  };

  const undoLightUp = () => {
    const j = document.getElementById("change-J");
    const m = document.getElementById("change-M");
    const a = document.getElementById("change-A");
    const x = document.getElementById("change-X");

    const letterDarken = (j, m, a, x) => {
      j.style.textShadow = "none";
      m.style.textShadow = "none";
      a.style.textShadow = "none";
      x.style.textShadow = "none";

      j.style.color = "#F4E9CD";
      m.style.color = "#F4E9CD";
      a.style.color = "#F4E9CD";
      x.style.color = "#F4E9CD";
    };

    let avatars = document.getElementsByClassName("member-avatar");
    for (let i = 0; i < 4; ++i) {
      avatars[i]?.addEventListener("onMouseLeave", letterDarken(j, m, a, x));
    }
  };

  return (
    <div className="about-page-container">

      <div className="app-description-container">
        <p className="app-description">
          A problem-solver web app allows users to share problems they find in
          daily life. They can choose to take offers from other users, or offer
          helps to other users. Everyone will feel included in this platform 
          and will always find others that experienced the same issues.
        </p>

        <div className="team-members-info">
          <div className="member-box">
            <div className="member-info">
              <div className="member-name">
                <span id="change-J">J</span>ordy
              </div>
              <div className="member-pos">Backend Lead</div>
              <a href={portfolioLinks[0]} target="_blank">
                <Avatar
                  alt="jor-profile"
                  src={avatar1}
                  sx={{ width: "12vw", height: "12vw" }}
                  className="member-avatar"
                  onMouseEnter={lightUpJMAX}
                  onMouseLeave={undoLightUp}
                />
              </a>
              <div className="online-presence-links">
                <a href={gitHubLinks[0]}>
                  <GitHubIcon sx={{fontSize: "2vw"}}/>
                </a>

                <a href={linkedInLinks[0]}>
                  <LinkedInIcon sx={{fontSize: "2vw"}}/>
                </a>
              </div>
            </div>

            <div className="member-info">
              <div className="member-name">
                <span id="change-M">M</span>anel
              </div>
              <div className="member-pos">Flex Lead</div>
              <a href={portfolioLinks[1]} target="_blank">
                <Avatar
                  alt="mal-profile"
                  src={avatar2}
                  sx={{ width: "12vw", height: "12vw" }}
                  className="member-avatar"
                  onMouseEnter={lightUpJMAX}
                  onMouseLeave={undoLightUp}
                />
              </a>
              <div className="online-presence-links">
                <a href={gitHubLinks[1]}>
                  <GitHubIcon sx={{fontSize: "2vw"}}/>
                </a>

                <a href={linkedInLinks[1]}>
                  <LinkedInIcon sx={{fontSize: "2vw"}}/>
                </a>
              </div>
            </div>

            <div className="member-info">
              <div className="member-name">
                <span id="change-A">A</span>smaa
              </div>
              <div className="member-pos">Frontend Lead</div>
              <a href={portfolioLinks[2]} target="_blank">
                <Avatar
                  alt="asm-profile"
                  src={avatar3}
                  sx={{ width: "12vw", height: "12vw" }}
                  className="member-avatar"
                  onMouseEnter={lightUpJMAX}
                  onMouseLeave={undoLightUp}
                />
              </a>
              <div className="online-presence-links">
                <a href={gitHubLinks[2]}>
                  <GitHubIcon sx={{fontSize: "2vw"}}/>
                </a>

                <a href={linkedInLinks[2]}>
                  <LinkedInIcon sx={{fontSize: "2vw"}}/>
                </a>
              </div>
            </div>

            <div className="member-info">
              <div className="member-name">
                <span id="change-X">X</span>iao Lin
              </div>
              <div className="member-pos">Team Lead</div>
              <a href={portfolioLinks[3]} target="_blank">
                <Avatar
                  alt="xlg-profile"
                  src={avatar4}
                  sx={{ width: "12vw", height: "12vw" }}
                  className="member-avatar"
                  onMouseEnter={lightUpJMAX}
                  onMouseLeave={undoLightUp}
                />
              </a>
              <div className="online-presence-links">
                <a href={gitHubLinks[3]}>
                  <GitHubIcon sx={{fontSize: "2vw"}}/>
                </a>

                <a href={linkedInLinks[3]}>
                  <LinkedInIcon sx={{fontSize: "2vw"}}/>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <a href="https://github.com/XLG123/JMAX" className="source-code-btn">
        Source Code
      </a>

    </div>
  );
};

export default AboutPage;
