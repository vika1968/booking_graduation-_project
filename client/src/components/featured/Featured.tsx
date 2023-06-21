

import useFetch from "../../hooks/useFetch";
import "./featured.scss";

const Featured = () => {
  const { data, loading, error } = useFetch<number[]>( "hotels/countByCity?cities=berlin,madrid,london");

  return (
    <div className="featured">
        {loading ? ("Loading..."
        ) : ( 
          <>
            <div className="featured__item">
              <img src="https://www.berlin.de/imgscaler/Lsn6XXpQlE2B0VoAVx669OGZ5zwxeyCTBWuDd1pP-6s/ropen/L3N5czExLXByb2QvZGVwb3NpdHBob3Rvcy9zdGFlZHRlL2RlcG9zaXRwaG90b3NfNDE5NzU2MjVfbC0yMDE1LmpwZw.jpg?ts=1685018832" alt="" className="featuredImg" />
              <div className="featured__titles">
                  <h1>Berlin</h1>
                  <h2>{data[0]}</h2>
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
            <h2>{data[1]} </h2>
          </div>
        </div>
        <div className="featured__item">
          <img
            src="https://www.fodors.com/assets/destinations/2869/tower-bridge-london-england_980x650.jpg"
            alt=""
            className="featured__img"
          />
          <div className="featured__titles">
            <h1>London</h1>
            <h2>{data[2]} </h2>
          </div>
        </div> 
      </>
      )}
    </div>
  );
};

export default Featured;






