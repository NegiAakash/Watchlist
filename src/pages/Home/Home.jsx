import React from "react";

import { connect } from "react-redux";
import Banner from "../../components/Banner/Banner";
import Search from "../../components/Search/Search";
import "./Home.css";
import Card from "../../components/Card/Card";
import MovieDetailPopup from "../../components/MovieDetailPopup/MovieDetailPopup";

function Home(props) {
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  const [cardDetailsData, setCardDetailsData] = React.useState({});

  function handleCardClick(e) {
    console.log("Here", e);
    setCardDetailsData(e);
    setIsPopupVisible(true);
  }

  React.useEffect(() => {
    // window.location.reload();
  }, []);

  return (
    <div className="home-wrapper">
      <Banner />
      <Search hasbutton={true} />
      {props.isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="home-content">
          {props.movieData ? (
            <div className="home-movie-wrapper">
              {props.movieData.map((item, index) => {
                return (
                  <Card
                    item={item}
                    key={index}
                    onClickEvent={handleCardClick}
                  />
                );
              })}
            </div>
          ) : (
            <h1>No Movie foung</h1>
          )}
        </div>
      )}

      <MovieDetailPopup
        isPopupVisible={isPopupVisible}
        setIsPopupVisible={setIsPopupVisible}
        movie={cardDetailsData}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  movieData: state.movieData,
});

export default connect(mapStateToProps)(Home);
