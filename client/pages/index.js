import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    const { data } = await axios.get("/api/users/currentUser");
    return data;
  }
};

export default LandingPage;
