const isAutheticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      const local:any = localStorage.getItem("jwt");
      return JSON.parse(local);
    } else {
      return false;
    }
  };
export default isAutheticated