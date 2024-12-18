import withAuth from '../hoc/withAuth';

function Dashboard() {
  return <h1>Welcome to the Dashboard</h1>;
}

export default withAuth(Dashboard, ['admin']);
