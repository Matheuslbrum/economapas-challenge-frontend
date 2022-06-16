import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("signed");

    if (userToken ) {
      const hasUser = JSON.parse(userToken)?.userId ? JSON.parse(userToken) : null;

      if (hasUser) setCurrentUser(hasUser);
    }
  }, []);

  const signin = async (name, password) => {
    await axios.post("https://challengeeconomapas-backend.herokuapp.com/login", {
      name,
      password,
    }).then((response) => {
      if(response.data.msg === 'Usuário logado'){
        setCurrentUser({
          userId: response.data.userId,
          username: response.data.username,
        });
        localStorage.setItem("signed", JSON.stringify({ userId: response.data.userId, username: response.data.username }));
    } else {
      alert(response.data.msg);
    }
    }).catch((error) => {
      return error;
    });
  };
  const signup = (name, password) => {
    axios.post("https://challengeeconomapas-backend.herokuapp.com/register", {
      name,
      password,
    }).then((response) => {
      if(response.data.msg !== "Usuário cadastrado com sucesso"){
        alert(response.data.msg)
      }
    }).catch((error) => {
      return error;
    });
  };
  const signout = () => {
    setCurrentUser(null);
    localStorage.removeItem("signed");
    document.location.reload();
  };


  return (
    <AuthContext.Provider
    value={{
      currentUser,
      isSinged: !!currentUser,
      signin,
      signup,
      signout
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);