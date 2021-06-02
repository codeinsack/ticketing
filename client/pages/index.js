import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentUser");
  return data;
};

export default LandingPage;
