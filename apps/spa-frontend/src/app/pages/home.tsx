import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="flex justify-center mt-8">
        <Link to="/e2eTest">E2E Test</Link>
      </div>
    </div>
  );
};

export default Home;
