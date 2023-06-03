// import React from "react";
// import useFetch from "../../hooks/useFetch";
// import "./featured.scss";

// const Featured: React.FC = () => {
//   const { data, loading, error } = useFetch<number[]>( "hotels/countByCity?cities=berlin,madrid,london");

//   return (
//     <div className="featured">
//       {loading ? (
//         "Loading..."
//       ) : data ? (
//         <>
//           <FeaturedItem
//             imgSrc="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
//             title="Berlin"
//             propertyCount={data[0]} // No need for type assertion
//           />
//           <FeaturedItem
//             imgSrc="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
//             title="Madrid"
//             propertyCount={data[1]} // No need for type assertion
//           />
//           <FeaturedItem
//             imgSrc="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
//             title="London"
//             propertyCount={data[2]} // No need for type assertion
//           />
//         </>
//       ) : (
//         "No data available."
//       )}
//     </div>
//   );
// };

import React from "react";
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
              <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="" className="featuredImg" />
              <div className="featured__titles">
                  <h1>Berlin</h1>
                  <h2>{data[0]} properties</h2>
              </div>
          </div>
          <div className="featured__item">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
            alt=""
            className="featured__img"
          />
          <div className="featured__titles">
            <h1>Madrid</h1>
            <h2>{data[1]} properties</h2>
          </div>
        </div>
        <div className="featured__item">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
            alt=""
            className="featured__img"
          />
          <div className="featured__titles">
            <h1>London</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </div> 
      </>
      )}
    </div>
  );
};

export default Featured;






