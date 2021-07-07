import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/buildClient";
import Header from "../components/Header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async ({ ctx, Component }) => {
  const client = buildClient(ctx);
  const { data } = await client.get("/api/users/currentUser");
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx, client, data.currentUser);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
