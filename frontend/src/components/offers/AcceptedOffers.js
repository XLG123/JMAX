import { useEffect, useState } from "react";
import * as offerActions from "../store/offers";
import { useDispatch, useSelector } from "react-redux";
import AcceptedOfferBox from "./AcceptedOfferBox";
import Fab from "@mui/material/Fab";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";

function AcceptedOffers() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers.all);
  const [visible, setVisible] = useState(false);
  // debugger
  useEffect(() => {
    dispatch(offerActions.fetchAcceptedOffers(userId));
  }, [userId, dispatch]);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  if (Object.keys(offers).length === 0) {
    // debugger
    return (
      <div className="no-accepted-offers-container">No Accepted Offers</div>
    );
  }
  return (
    <>
      <div className="accepted-offers">
        <div className="offer-container">
          {offers?.map((offer) => (
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
