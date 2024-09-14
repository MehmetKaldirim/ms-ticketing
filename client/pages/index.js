import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are sign in</h1> : <h1>You are not sign in</h1>;

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
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
