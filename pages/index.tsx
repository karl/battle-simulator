import Head from "next/head";

const Home = () => (
  <div className="container">
    <Head>
      <title>Battle Simulator</title>
    </Head>

    <h1 className="title">Battle Simulator</h1>

    <div className="diorama">
      <div className="character">
        <div className="name">Player</div>
        <div className="health">♥️ 100</div>
      </div>
      <div className="character">
        <div className="name">Monster</div>
        <div className="health">♥️ 100</div>
      </div>
    </div>

    <div className="combat">
      <div className="dice">
        <div>⚄</div>
        <div>⚃</div>
      </div>
      <div className="result">⚔️ -6</div>
      <div className="dice">
        <div>⚀</div>
        <div>⚁</div>
      </div>
    </div>

    <div className="actions">
      <button className="attack-button">Attack!</button>
    </div>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      .title {
        margin: 0;
        padding: 10px;
        line-height: 1;
        font-size: 16px;
        text-align: center;
        color: #888888;
      }

      .diorama {
        display: flex;
        padding: 20px;
      }

      .character {
        flex: 1 1 auto;
        text-align: center;
        font-size: 30px;
      }

      .health {
        color: #ce2500;
      }

      .combat {
        display: flex;
        padding: 20px;
        align-items: center;
      }

      .dice {
        flex: 1 1 auto;
        text-align: center;
        font-size: 70px;
        line-height: 1;
        color: #222222;
      }

      .result {
        flex: 1 1 auto;
        text-align: center;
        font-size: 40px;
        line-height: 1;
        color: #ce2500;
      }

      .actions {
        display: flex;
        justify-content: center;
        padding: 20px;
      }

      .attack-button {
        font-size: 20px;
        background: #006fb1;
        color: #f5f5f5;
        border: none;
        border-radius: 30px;
        padding: 10px 20px;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Home;
