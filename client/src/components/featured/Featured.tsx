import "./featured.scss";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featured__item">
        <img
          src="https://www.berlin.de/imgscaler/Lsn6XXpQlE2B0VoAVx669OGZ5zwxeyCTBWuDd1pP-6s/ropen/L3N5czExLXByb2QvZGVwb3NpdHBob3Rvcy9zdGFlZHRlL2RlcG9zaXRwaG90b3NfNDE5NzU2MjVfbC0yMDE1LmpwZw.jpg?ts=1685018832"
          alt=""
          className="featuredImg"
        />
        <div className="featured__titles">
          <h1>Berlin</h1>
        </div>
      </div>
      <div className="featured__item">
        <img
          src="https://www.berlin.de/imgscaler/Lsn6XXpQlE2B0VoAVx669OGZ5zwxeyCTBWuDd1pP-6s/ropen/L3N5czExLXByb2QvZGVwb3NpdHBob3Rvcy9zdGFlZHRlL2RlcG9zaXRwaG90b3NfNDE5NzU2MjVfbC0yMDE1LmpwZw.jpg?ts=1685018832"
          alt=""
          className="featured__img"
        />
        <div className="featured__titles">
          <h1>Madrid</h1>
        </div>
      </div>
      <div className="featured__item">
        <img
          src="https://media.istockphoto.com/id/1400112152/photo/london-red-buses-zooming-through-city-skyscrapers-night-street.jpg?s=2048x2048&w=is&k=20&c=OAZ1EiL1h7I1tuCR6DemQjk1rugsp2iGZAiB-tDBWyw="
          alt=""
          className="featured__img"
        />
        <div className="featured__titles">
          <h1>London</h1>
        </div>
      </div>
    </div>
  );
};

export default Featured;
