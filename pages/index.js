import Head from "next/head";
import packageJson from "../package.json";


export default function Home(props) {
  const {liff, liffError} = props;

  // Avoid deployment issues
  if (liff === null) {
    return (<div><h1>Nope.</h1></div>);
  }

  // Wait until liff is ready
  (async () => {
    await liff.ready;
  })();

  // Ensure login
  if (!liff.isLoggedIn()) {
    liff.login();
  }

  // Return HTML
  return (
    <div>
      <Head>
        <title>tØrg</title>
      </Head>
      <div className="home">

        {/* Title */}
        <h1 className="home__title">
          Welcome to tØrg!
        </h1>

        {/* Buttons */}
        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            OS:
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getOS()}
          </span>
        </div>

        {/* Buttons */}
        <div className="home__buttons">
          <button
            onClick={() => {
              (async () => {
                let profile = await liff.getProfile();
                console.log("getProfile:", profile)
              })();
            }}
            className="home__buttons__button button--secondary"
          >
            getProfile
          </button>
        </div>

        <div className="home__buttons">
          <button
            onClick={() => {
              liff.logout();
              window.location.reload();
            }}
            className="home__buttons__button button--secondary"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
