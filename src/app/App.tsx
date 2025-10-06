import { useEffect, useState } from "react";
import AppRoutes from "../AppRoutes";
import Loader from "../shared/components/loader/Loader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake 2s loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader duration={2000} />;
  }

  return <AppRoutes />;
};

export default App;
