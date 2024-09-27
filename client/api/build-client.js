import axios from "axios";

const BuildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    console.log("in server");
    return axios.create({
      baseURL: "http://www.math-web-project-all.info",
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    console.log("in browser");
    return axios.create({
      baseUrl: "/",
    });
  }
};

export default BuildClient;
