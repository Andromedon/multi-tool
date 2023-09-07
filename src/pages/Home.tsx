import { useEffect } from 'react';
const title = 'Home';

const Home = () => {
  useEffect(() => {
    document.title = title;
  });

  return (
    <h1 style={{ textAlign: 'center' }}>Welcome to Andro's MultiTool App :)</h1>
  );
};

export default Home;
