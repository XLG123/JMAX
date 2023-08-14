import { useEffect, useState } from "react";
import * as offerActions from "../store/offers";
import { useDispatch, useSelector } from "react-redux";
import AcceptedOfferBox from "./AcceptedOfferBox";
import Fab from "@mui/material/Fab";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Tooltip } from "@mui/material";

function AcceptedOffers() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers.all);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(offerActions.fetchAcceptedOffers(user._id));
  }, [user, dispatch]);

  if (Object.keys(offers).length === 0) {
    return null;
  }

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200){
      setVisible(true)
    } 
    else if (scrolled <= 200){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', toggleVisible);

  return (
    <>
      <div className="accepted-offers">
        <div className="offer-container">
          {offers.map((offer) => (
            <AcceptedOfferBox key={offer._id} offer={offer} />
          ))}
        </div>

        <Tooltip title="scroll to top">
          <Fab
            className="accepted-offers-fab"
            sx={{ backgroundColor: "#9dbebb", width: "4vw", height: "4vw" }}
            onClick={scrollToTop}
          >
            <KeyboardDoubleArrowUpIcon sx={{ fontSize: "2.5vw" }} />
          </Fab>
        </Tooltip>
      </div>
    </>
  );
}
export default AcceptedOffers;
