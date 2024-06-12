import Head from "next/head";
import packageJson from "../package.json";


export default function Home(props) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/
  const {liff, liffError} = props;

  if (liff === null) {
    return (<div><h1>Nope.</h1></div>);
  }


  (async () => {
    await liff.ready;
  })();


  if (!liff.isLoggedIn()) {
    liff.login();
  }

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

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            test:
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getIDToken()}
          </span>
        </div>
      </div>
    </div>
  );

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

        {/* Table */}
        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getVersion()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getVersion()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getOS()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getOS()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getLanguage()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getLanguage()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getVersion()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getVersion()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getLineVersion()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getLineVersion()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.isInClient()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.isInClient()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.isLoggedIn()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.isLoggedIn()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.isApiAvailable('shareTargetPicker')
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.isApiAvailable('shareTargetPicker')}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getAccessToken()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getAccessToken()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getIDToken()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getIDToken()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getDecodedIDToken()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getDecodedIDToken()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getProfile()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getProfile()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getFriendship()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getFriendship()}
          </span>
        </div>

        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            liff.getContext()
          </span>
          <span className="home__badges__badge badge--secondary">
            {liff.getContext()}
          </span>
        </div>

        {/* Buttons */}
        <div className="home__buttons">
          <button
            onClick={() => liff.closeWindow()}
            className="home__buttons__button button--secondary"
          >
            Close Window
          </button>
        </div>
        <div className="home__buttons">
          <a
            href="https://developers.line.biz/en/docs/liff/developing-liff-apps/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--primary"
          >
            LIFF Documentation
          </a>
          <a
            href="https://liff-playground.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--tertiary"
          >
            LIFF Playground
          </a>
          <a
            href="https://developers.line.biz/console/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--secondary"
          >
            LINE Developers Console
          </a>
        </div>
      </div>
    </div>
  );
}
