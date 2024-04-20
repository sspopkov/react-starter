import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: 30 }}>
      <h1>Home Page</h1>
      <p>
        <Link to="/carprice">Go to Sample page</Link>
      </p>
    </div>
  );
};

export default HomePage;
