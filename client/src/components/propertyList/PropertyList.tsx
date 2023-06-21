import useFetch from "../../hooks/useFetch";
import "./propertyList.scss";

interface Property {
  type: string;
  count: number;
}

const PropertyList = () => {
  //const { data, loading, error } = useFetch<Property[]>("/hotels/countByType");
  const { data, loading, error } = useFetch("/hotels/countByType");
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
  ];

//   return (
//     <div className="pList">
//       {loading ? (
//         "Loading..."
//       ) : (
//         <>
//           {data &&
//             images.map((item, i) => {
//              // console.log(images[i]); // Output the image URL to console during render
//               return (
//                 <div className="pListItem" key={i}>
//                   <img src={images[i]} alt="" className="pListImg" />
//                   <div className="pListTitles">
//                     {/* <h1>{item.type}</h1>
//                     <h2>
//                       {item?.count} {item?.type}
//                     </h2> */}
//                   </div>
//                 </div>
//               );
//             })}
//         </>
//       )}
//     </div>
//   );
// };

return (
  <div className="pList">
    {loading ? (
      "Loading..."
    ) : (
      <>
        {data &&
          images.map((item, i) => {
            // console.log(images[i]); // Output the image URL to console during render
            return (
              <div className="pList__item" key={i}>
                <img src={images[i]} alt="" className="pList__img" />
                <div className="pList__titles">
                  {/* <h1>{item.type}</h1>
                  <h2>
                    {item?.count} {item?.type}
                  </h2> */}
                </div>
              </div>
            );
          })}
      </>
    )}
  </div>
);
};

export default PropertyList;
