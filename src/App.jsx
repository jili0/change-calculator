import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/AppRouter";
import { DataContextProvider } from "./contexts/DataContext.jsx";

const App = () => {
  return (
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  );
};

export default App;
