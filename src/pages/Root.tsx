import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

function Root() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}

export default Root;
