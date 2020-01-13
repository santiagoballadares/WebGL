import React, {Component} from "react";

const AppContext = React.createContext();
const AppContextConsumer = AppContext.Consumer;

class AppContextProvider extends Component {

  state = {
    settings: {},
  };

  setSettings = (settings = {}) => {
    this.setState({settings});
  };

  setSettingValue = (value, settingName, settingsKey) => {
    this.setState(prevState => {
      return {
        settings: {
          [settingsKey]: {
            ...prevState.settings[settingsKey],
            [settingName]: value,
          },
        },
      };
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setSettings: this.setSettings,
          setSettingValue: this.setSettingValue,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }

}

export {AppContext, AppContextProvider, AppContextConsumer};
