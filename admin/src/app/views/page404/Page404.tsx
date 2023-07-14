import { Link } from "react-router-dom";
import "./page404.scss";

const Page404 = () => {
  return (
    <div className="page404">
      <h1>Page404</h1>
      <p>
        Go back <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default Page404;