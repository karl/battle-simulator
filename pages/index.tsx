import Head from "next/head";
import { useReducer } from "react";

const roll = () => {
  return Math.floor(Math.random() * 6) + 1;
};

enum Actions {
  ATTACK = "ATTACK"
}

enum States {
  READY = "READY",
  COMBAT = "COMBAT",
  VICTORY = "VICTORY",
  DEATH = "DEATH"
}

const initialState = {
  state: States.READY,
  playerHealth: 100,
  monsterHealth: 100,
  playerDice: [6, 6],
  monsterDice: [6, 6],
  playerDamage: 0,
  monsterDamage: 0
};

const reducer = (state: typeof initialState, action) => {
  // Don't do anything if combar is over
  if (state.state === States.VICTORY || state.state == States.DEATH) {
    return state;
  }

  if (action.type === Actions.ATTACK) {
    const playerDice = [roll(), roll()];
    const monsterDice = [roll(), roll()];
    const difference =
      playerDice[0] + playerDice[1] - (monsterDice[0] + monsterDice[1]);
    const playerDamage = difference < 0 ? Math.abs(difference) : 0;
    const monsterDamage = difference > 0 ? Math.abs(difference) : 0;
    const playerHealth = state.playerHealth - playerDamage;
    const monsterHealth = state.monsterHealth - monsterDamage;

    const newState =
      playerHealth <= 0
        ? States.DEATH
        : monsterHealth <= 0
        ? States.VICTORY
        : States.COMBAT;

    return {
      state: newState,
      playerHealth,
      monsterHealth,
      playerDice,
      monsterDice,
      playerDamage,
      monsterDamage
    };
  }

  return state;
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="container">
      <Head>
        <title>Battle Simulator</title>
      </Head>

      <h1 className="title">Battle Simulator</h1>

      <div className="diorama">
        <div className="character">
          <div className="name">Player</div>
          <div className="health">
            {state.playerHealth > 0 ? "♥️" : "☠️"} {state.playerHealth}
          </div>
        </div>
        <div className="character">
          <div className="name">Monster</div>
          <div className="health">
            {state.monsterHealth > 0 ? "♥️" : "☠️"} {state.monsterHealth}
          </div>
        </div>
      </div>

      <div className="combat">
        {state.state === States.COMBAT && (
          <>
            <div className="dice">
              <div>{state.playerDice[0]}</div>
              <div>{state.playerDice[1]}</div>
            </div>
            <div className="attack-result">
              {state.playerDamage > 0 ? "-" + state.playerDamage : ""} ⚔️{" "}
              {state.monsterDamage > 0 ? "-" + state.monsterDamage : ""}
            </div>
            <div className="dice">
              <div>{state.monsterDice[0]}</div>
              <div>{state.monsterDice[1]}</div>
            </div>
          </>
        )}
        {state.state === States.VICTORY && (
          <div className="combat-result">🎉 Victory</div>
        )}
        {state.state === States.DEATH && (
          <div className="combat-result">☠️ Death</div>
        )}
      </div>

      <div className="actions">
        <button
          className="attack-button"
          disabled={
            state.state === States.VICTORY || state.state === States.DEATH
          }
          onClick={() => dispatch({ type: Actions.ATTACK })}
        >
          Attack!
        </button>
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
          justify-content: center;
          flex: 1 1 auto;
        }

        .dice {
          flex: 1 1 auto;
          text-align: center;
          font-size: 70px;
          line-height: 1;
          color: #222222;
        }

        .attack-result {
          flex: 1 1 auto;
          text-align: center;
          font-size: 40px;
          line-height: 1;
          color: #ce2500;
        }

        .combat-result {
          font-size: 30px;
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

        .attack-button:disabled {
          opacity: 0.4;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
