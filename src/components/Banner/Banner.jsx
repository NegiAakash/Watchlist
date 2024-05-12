import "./Banner.css";

function Banner() {
  return (
    <div className="banner-wrapper">
      <div className="banner-title">
        Welcome to
        <p>&nbsp;Watchlists</p>
      </div>
      <div className="banner-body">
        <p>
          Browse movies, add them to watchlists and share them with friends.
        </p>
        <p>
          Just click the
          <span> I </span>
          to add a movie, the poster to see more details
        </p>
      </div>
    </div>
  );
}

export default Banner;
