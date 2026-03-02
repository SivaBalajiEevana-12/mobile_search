import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
return ( <div className="nf-container"> <div className="nf-card"> <div className="nf-emoji">🚫</div>


    <h1 className="nf-title">404</h1>
    <h2 className="nf-subtitle">Page Not Found</h2>

    <p className="nf-text">
      Oops! The page you're looking for doesn't exist or has been moved.
    </p>

    <Link to="/search" className="nf-button">
      ← Back to Search
    </Link>
  </div>
</div>


);
}

export default NotFoundPage;
