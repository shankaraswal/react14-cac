import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
// import { login, logout } from "./store/authSlice";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .createAccount({
        email: "ss@ss.com",
        password: "123456",
        name: "shankar",
      })
      .then((userData) => {
        if (userData) {
          dispatch({ userData });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log({ error: err });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <div className="min-hsc">
      {!loading ? (
        <>
          <Header />
          <div>content area</div>
          <Footer />
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default App;
