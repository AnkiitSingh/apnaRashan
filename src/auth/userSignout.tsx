import {API} from '../Api'

const signout = (next:any) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      return fetch(`${API}/signout`, {
        method: "GET"
      })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err));
    }
  };
export default signout;