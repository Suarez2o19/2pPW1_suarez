import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Bienvenido al dashboard</h1>
            <Link to="/menu">Ir a John</Link>
        </div>
    );
};

export default Dashboard;
  