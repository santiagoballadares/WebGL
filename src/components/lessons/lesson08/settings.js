import React, {Component} from 'react';
import {AppContext} from "../../appContext";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
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

  handleBumpmappingTypeChange(event) {
    this.context.setSettingValue(+event.target.value, 'bumpmappingType', this.state.lessonId);
  }

  handleParallaxScaleChange(event, value) {
    this.context.setSettingValue(value, 'parallaxScale', this.state.lessonId);
  }

  handleStepsScaleChange(event, value) {
    this.context.setSettingValue(value, 'numberOfSteps', this.state.lessonId);
  }

  renderBumpmappingTypes() {
    const {bumpmappingTypes} = this.state;
    const {bumpmappingType} = this.context.settings[this.state.lessonId];

    return (
      <div className={style.bumpmappingTypes}>
        <RadioGroup
          value={bumpmappingType}
          onChange={this.handleBumpmappingTypeChange}
        >
          {bumpmappingTypes.map(item => {
            return (
              <FormControlLabel
                key={item.value}
                label={item.label}
                value={item.value}
                control={<Radio color="primary" />}
              />
            );
          })}
        </RadioGroup>
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
          defaultValue={parallaxScale}
          min={parallaxScaleSettings.min}
          max={parallaxScaleSettings.max}
          step={parallaxScaleSettings.step}
          marks
          track={false}
          onChange={this.handleParallaxScaleChange}
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
          defaultValue={numberOfSteps}
          min={stepsScaleSettings.min}
          max={stepsScaleSettings.max}
          step={stepsScaleSettings.step}
          marks
          track={false}
          onChange={this.handleStepsScaleChange}
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
