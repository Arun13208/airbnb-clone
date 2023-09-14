import { createContext, useContext, useEffect, useReducer } from "react";
import { customerReducer } from "./Reducers";
import Cookies from "js-cookie";
import axios from "axios";

const Customer = createContext();

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(customerReducer, {
    user: {},
    places: [],
    userPlaces: [],
    bookings: [],
  });

  useEffect(() => {
    if (!!state.user) {
      const token = Cookies.get("token");
      if (token) {
        try {
          axios
            .get("/profile")
            .then(({ data }) => {
              dispatch({ type: "ADD_USER", payload: data });
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Customer.Provider value={{ state, dispatch }}>
      {children}
    </Customer.Provider>
  );
};

export const useCustomerState = () => {
  return useContext(Customer);
};
