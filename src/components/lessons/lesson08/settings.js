import React, {Component} from 'react';
import {AppContext} from "../../appContext";
import {Radio} from 'semantic-ui-react';
import {Slider} from 'react-semantic-ui-range';
import LessonsUtils from '../common/lessonsUtils';

import style from './settings.scss';

class Settings extends Component {

  constructor(props) {
    super(props);
    const settingsData = LessonsUtils.getSettingsData()[8];
    this.state = {
      lessonId: 8,
      bumpmappingTypes: settingsData.bumpmappingTypes,
      parallaxScaleSettings: settingsData.parallaxScaleSettings,
      stepsScaleSettings: settingsData.stepsScaleSettings,
    };
    this.handleBumpmappingTypeChange = this.handleBumpmappingTypeChange.bind(this);
    this.handleParallaxScaleChange = this.handleParallaxScaleChange.bind(this);
    this.handleStepsScaleChange = this.handleStepsScaleChange.bind(this);
  }

  handleBumpmappingTypeChange(event, { value }) {
    this.context.setSettingValue(value, 'bumpmappingType', this.state.lessonId);
  }

  handleParallaxScaleChange(value) {
    this.context.setSettingValue(value, 'parallaxScale', this.state.lessonId);
  }

  handleStepsScaleChange(value) {
    this.context.setSettingValue(value, 'numberOfSteps', this.state.lessonId);
  }

  renderBumpmappingTypes() {
    const {bumpmappingTypes} = this.state;
    const {bumpmappingType} = this.context.settings[this.state.lessonId];

    return (
      <div className={style.bumpmappingTypes}>
        {bumpmappingTypes.map(item => {
          return (
            <Radio
              key={item.value}
              name="bumpmappingTypeRadioGroup"
              label={item.label}
              value={item.value}
              checked={bumpmappingType === item.value}
              onChange={this.handleBumpmappingTypeChange}
            />
          );
        })}
      </div>
    );
  }

  renderParallaxScale() {
    const {bumpmappingTypes, parallaxScaleSettings} = this.state;
    const {bumpmappingType, parallaxScale} = this.context.settings[this.state.lessonId];

    if (
      ![
        bumpmappingTypes[2].value,
        bumpmappingTypes[3].value,
        bumpmappingTypes[4].value,
      ].includes(bumpmappingType)
    ) {
      return null;
    }

    return (
      <div className={style.scaleItem}>
        <span>Parallax Scale: {parallaxScale}</span>
        <Slider
          discrete
          color="teal"
          inverted={false}
          settings={{
            ...parallaxScaleSettings,
            start: parallaxScale,
            onChange: this.handleParallaxScaleChange,
          }}
        />
      </div>
    );
  }

  renderStepsScale() {
    const {bumpmappingTypes, stepsScaleSettings} = this.state;
    const {bumpmappingType, numberOfSteps} = this.context.settings[this.state.lessonId];

    if (
      ![
        bumpmappingTypes[3].value,
        bumpmappingTypes[4].value,
      ].includes(bumpmappingType)
    ) {
      return null;
    }

    return (
      <div className={style.scaleItem}>
        <span>Number of steps: {numberOfSteps}</span>
        <Slider
          discrete
          color="teal"
          inverted={false}
          settings={{
            ...stepsScaleSettings,
            start: numberOfSteps,
            onChange: this.handleStepsScaleChange,
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={style.controlsRoot}>
        {this.renderBumpmappingTypes()}
        {this.renderParallaxScale()}
        {this.renderStepsScale()}
      </div>
    );
  }

}

Settings.contextType = AppContext;

export default Settings;
