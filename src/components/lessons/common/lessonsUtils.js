import React from 'react';

import Lesson01 from '../lesson01';
import Lesson02 from '../lesson02';
import Lesson03 from '../lesson03';
import Lesson04 from '../lesson04';
import Lesson05 from '../lesson05';
import Lesson06 from '../lesson06';
import Lesson07 from '../lesson07';
import Lesson08 from '../lesson08';

import Lesson08Settings from '../lesson08/settings';

const lessonsList = [{
  id: 1,
  name: '2D content',
}, {
  id: 2,
  name: 'Shaders',
}, {
  id: 3,
  name: 'Transforms',
}, {
  id: 4,
  name: '3D content',
}, {
  id: 5,
  name: 'Textures',
}, {
  id: 6,
  name: 'Animating textures',
}, {
  id: 7,
  name: 'Lighting',
}, {
  id: 8,
  name: 'Bump mapping',
}];

const settingsData = {
  8: {
    bumpmappingTypes: [
      {
        label: 'No bump mapping',
        value: 0,
      }, {
        label: 'Normal mapping',
        value: 1,
      }, {
        label: 'Parallax mapping',
        value: 2,
      }, {
        label: 'Steep parallax mapping',
        value: 3,
      }, {
        label: 'Parallax occlusion mapping',
        value: 4,
      },
    ],
    parallaxScaleSettings: {
      default: 0.05,
      min: 0,
      max: 0.1,
      step: 0.01,
    },
    stepsScaleSettings: {
      default: 4,
      min: 1,
      max: 32,
      step: 1,
    },
  },
};

const settingsInitialState = {
  8: {
    bumpmappingType: 4,
    parallaxScale: settingsData[8].parallaxScaleSettings.default,
    numberOfSteps: settingsData[8].stepsScaleSettings.default,
  },
};

class LessonsUtils {

  static getLessonsList() {
    return lessonsList;
  }

  static getSettingsData() {
    return settingsData;
  }

  static getSettingsInitialState() {
    return settingsInitialState;
  }

  static getLessonComponent(lessonId) {
    switch (lessonId) {
      case 1:
        return <Lesson01 />;

      case 2:
        return <Lesson02 />;

      case 3:
        return <Lesson03 />;

      case 4:
        return <Lesson04 />;

      case 5:
        return <Lesson05 />;

      case 6:
        return <Lesson06 />;

      case 7:
        return <Lesson07 />;
  
      case 8:
        return <Lesson08 />;

      default:
        return null;
    }
  }

  static getLessonSettingsComponent(lessonId) {
    switch (lessonId) {
      case 8:
        return <Lesson08Settings />;

      default:
        return null;
    }
  }

}

export default LessonsUtils;
