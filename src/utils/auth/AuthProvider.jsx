import { createContext, useEffect, useState } from "react";

/**
 Check the token's validity on mount
   
    If the token is valid, set the authentication state to true
*/

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  console.log(children);
  // useEffect(() => {
  //   //   Here I am making an API call to validate the token
  //   setIsAuthenticated(true);
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default { AuthProvider, AuthContext };
