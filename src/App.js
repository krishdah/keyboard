import React, { Component } from "react";
import data from "./data";

class App extends Component {
  state = {
    keyCode: [],
    keys: [],
    pressedKey: "",
    inputText: "",
    story: []
  };
  textArea = React.createRef();
  componentDidMount() {
    this.setState({
      keyCode: [...data.keyCode],
      keys: [...data.keys],
      story: data.story.split("")
    });
  }

  onKeyDownHandler = event => {
    let key = event.keyCode;
    console.log(key);
    let index = this.state.keyCode.indexOf(key);
    let value = this.state.keys[index];
    this.setState({ pressedKey: value });
  };

  onClickHandler = event => {
    let value = event.target.dataset.value;
    this.textArea.current.focus();
    let ip = this.state.inputText;
    if (value !== undefined) {
      let ignoreKeys = [
        "tab",
        "home",
        "alt",
        "ctrl",
        "pg dn",
        "caps lock",
        "shift",
        "enter"
      ];
      if (!ignoreKeys.includes(value)) {
        let newText;
        if (value === "backspace") {
          newText = ip.substring(0, ip.length - 1);
        } else if (value === "space") {
          newText = ip.concat(" ");
        } else {
          newText = ip.concat(value);
        }

        this.setState({ inputText: newText });
      }
    }
  };

  onChangeHandler = e => {
    let value = e.target.value;
    this.setState({ inputText: value });
  };

  render() {
    let keys = this.state.keys;
    let active = this.state.pressedKey;
    let str = this.state.story;
    let ip = this.state.inputText;
    let words = ip.split(" ");
    let count = words.length;
    let errorCount = 0;
    let correctCount = 0;
    return (
      <div className="App">
        <div className="keyboard-container">
          <div className="header">
            <p>
              Words Typed : <span className="word-count">{count - 1}</span>
            </p>
            <h1>Typing Ground</h1>
            <div className="accuracy-calc">
              {ip.length === str.length && (
                <React.Fragment>
                  <p>Congratulations!! Test completed</p>
                  <p>Accuracy : </p>
                </React.Fragment>
              )}
            </div>

            <div className="count-container">
              <p>Correct: </p>
              <p>Error: </p>
            </div>
          </div>
          <div className="story">
            {str.length && (
              <p>
                {str.map((val, i) => {
                  return val === ip[i] ? (
                    <React.Fragment>
                      <span className="correct-text">{val}</span>
                      <span className="error-counter">{correctCount++}</span>
                    </React.Fragment>
                  ) : ip[i] === undefined ? (
                    val
                  ) : (
                    <React.Fragment>
                      <span className="error-text">{val}</span>
                      <span className="error-counter">{errorCount++}</span>
                    </React.Fragment>
                  );
                })}
              </p>
            )}
          </div>
          <p className="error-count">{errorCount}</p>
          <p className="correct-count">{correctCount}</p>
          {ip.length === str.length && (
            <p className="accuracy-count">
              {Math.floor((correctCount / (errorCount + correctCount)) * 100)} %
            </p>
          )}
          <textarea
            ref={this.textArea}
            className="text-area"
            onKeyDown={this.onKeyDownHandler}
            value={this.state.inputText}
            onChange={this.onChangeHandler}
          />
          <div className="keyboard" onClick={this.onClickHandler}>
            {keys.length &&
              keys.map(key => {
                return (
                  <li
                    className={active === key ? "active" : ""}
                    data-value={key}
                  >
                    {key}
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
