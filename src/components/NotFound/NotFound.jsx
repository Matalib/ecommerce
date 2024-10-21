import { Link } from "react-router-dom";
import notFoundImage from "../../assets/imgs/notFoundImg.svg";
const NotFound = () => {
  return (
    <div className="container mt-5 py-5">
      <div className="h-75 d-flex align-items-center justify-content-center flex-column gap-4 py-5">
        <img src={notFoundImage} alt="404 Image" className="w-50" />
        <Link to="/home">
          <button className="btn btn-success mt-2">Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
