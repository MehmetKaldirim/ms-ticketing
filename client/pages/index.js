import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("current user");
  console.log(currentUser);
  // axios.get("/api/users/currentuser").catch((err) => {
  //   console.log(err.message);
  // });

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    console.log("we are in server");
    // we are on the server!
    // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );

    return data;
  } else {
    // we are on the browser!
    console.log("we are in browser");
    // requests can be made with a base url of ''
    const { data } = await axios.get("/api/users/currentuser");

    return data;
  }
  return {};
};

//a way to use ssr inside the cluster
// LandingPage.getInitialProps = async ({ req }) => {
//   let url;

//   if (typeof window === "undefined") {
//     // We're on the server, so we need an absolute URL
//     const baseURL = req ? `http://${req.headers.host}` : ""; // Get host from request headers
//     url = `${baseURL}/api/users/currentuser`;
//   } else {
//     // We're on the client, so relative URL is fine
//     url = "/api/users/currentuser";
//   }
//   console.log(url);
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     return { currentUser: null };
//   }
// };

export default LandingPage;
