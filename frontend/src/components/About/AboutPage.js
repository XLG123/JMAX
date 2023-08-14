import webAppLogo from "../../assets/images/webAppLogo.jpg";
import avatar1 from "../../assets/images/avatar1.png";
import avatar2 from "../../assets/images/avatar2.png";
import avatar3 from "../../assets/images/avatar3.png";
import avatar4 from "../../assets/images/avatar4.png";
import "./AboutPage.css";
import Avatar from "@mui/material/Avatar";

const AboutPage = () => {
  const gitHubLinks = [
    "https://github.com/j-corp-25",
    "https://github.com/Manel-Oulds",
    "https://github.com/AsmaaEliwa",
    "https://github.com/XLG123",
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
      <div className="splash-container">
        <div className="image-container">
          <img src={webAppLogo} alt="app-logo" className="splash-logo" />
        </div>
      </div>

      <div className="app-description-container">
        <p className="app-description">
          A problem-solver web app allows users to share problems they find in
          daily life. They can choose to take offers from other users, or offer
          helps to other users. Everyone will feel included in this platform 
          and will always find others that experienced the same issues.
        </p>
      </div>

      <div className="team-members-info">
        <div className="member-box-container">
          <div className="member-box">
            <div className="member-name">
              <div className="member-name">
                <span id="change-J">J</span>ordy
              </div>
              <br />
              <div className="member-pos">Backend Lead</div>
              <br />
              <a href={gitHubLinks[0]}>
                <Avatar
                  alt="jor-profile"
                  src={avatar1}
                  sx={{ width: "12vw", height: "12vw" }}
                  className="member-avatar"
                  onMouseEnter={lightUpJMAX}
                  onMouseLeave={undoLightUp}
                />
              </a>
            </div>

            <div className="member-name">
              <div className="member-name">
                <span id="change-M">M</span>anel
              </div>
              <br />
              <div className="member-pos">Backend Lead</div>
              <br />
              <a href={gitHubLinks[1]}>
                <Avatar
                  alt="mal-profile"
                  src={avatar2}
                  sx={{ width: "12vw", height: "12vw" }}
                  className="member-avatar"
                  onMouseEnter={lightUpJMAX}
                  onMouseLeave={undoLightUp}
                />
              </a>
            </div>

            <div className="member-name">
              <div className="member-name">
                <span id="change-A">A</span>smaa
              </div>
              <br />
              <div className="member-pos">Frontend Lead</div>
              <br />
              <a href={gitHubLinks[2]}>
                <Avatar
                  alt="asm-profile"
                  src={avatar3}
                  sx={{ width: "12vw", height: "12vw" }}
                  className="member-avatar"
                  onMouseEnter={lightUpJMAX}
                  onMouseLeave={undoLightUp}
                />
              </a>
            </div>

            <div className="member-name">
              <div className="member-name">
                <span id="change-X">X</span>iao Lin
              </div>
              <br />
              <div className="member-pos">Frontend Lead</div>
              <br />
              <a href={gitHubLinks[3]}>
                <Avatar
                  alt="xlg-profile"
                  src={avatar4}
                  sx={{ width: "12vw", height: "12vw" }}
                  className="member-avatar"
                  onMouseEnter={lightUpJMAX}
                  onMouseLeave={undoLightUp}
                />
              </a>
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
