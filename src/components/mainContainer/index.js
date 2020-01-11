import React, {Component} from 'react';
import SidePanel from './sidePanel';
import Lesson01 from '../lessons/lesson01';
import Lesson02 from '../lessons/lesson02';
import Lesson03 from '../lessons/lesson03';
import Lesson04 from '../lessons/lesson04';
import Lesson05 from '../lessons/lesson05';
import Lesson06 from '../lessons/lesson06';
import Lesson07 from '../lessons/lesson07';

import style from './index.scss';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [{
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
      }],
    };
    this.selectLesson = this.selectLesson.bind(this);
  }

  selectLesson(lessonId) {
    this.setState({currentLesson: lessonId});
  }

  getLessonComponent() {
    const {currentLesson} = this.state;

    switch (currentLesson) {
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

      default:
        return null;
    }
  }

  renderSidePanel() {
    const { lessons = [], currentLesson } = this.state;
    return (
      <div className={style.sidePanel}>
        <SidePanel
          title="Lessons"
          items={lessons}
          currentItem={currentLesson}
          selectItem={this.selectLesson}
        />
      </div>
    );
  }

  renderViewContainer() {
    return (
      <div className={style.viewContainer}>
        {this.getLessonComponent()}
      </div>
    );
  }

  render() {
    return (
      <div className={style.mainContainerRoot}>
        {this.renderSidePanel()}
        {this.renderViewContainer()}
      </div>
    );
  }
}

export default MainContainer;
