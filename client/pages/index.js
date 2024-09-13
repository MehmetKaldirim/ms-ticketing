import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  // axios.get("/api/users/currentuser").catch((err) => {
  //   console.log(err.message);
  // });

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  let url;

  if (typeof window === "undefined") {
    // We're on the server, so we need an absolute URL
    const baseURL = req ? `http://${req.headers.host}` : ""; // Get host from request headers
    url = `${baseURL}/api/users/currentuser`;
  } else {
    // We're on the client, so relative URL is fine
    url = "/api/users/currentuser";
  }
  console.log(url);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    return { currentUser: null };
  }
};

export default LandingPage;
