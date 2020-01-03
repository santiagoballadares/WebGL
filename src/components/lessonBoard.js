import React, {Component} from 'react';
import Lesson01 from './lessons/lesson01';
import Lesson02 from './lessons/lesson02';
import Lesson03 from './lessons/lesson03';
import Lesson04 from './lessons/lesson04';
import Lesson05 from './lessons/lesson05';
import Lesson06 from './lessons/lesson06';

import styles from '../styles/app.scss';

class LessonBoard extends Component {
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
        name: 'Lighting',
      }, {
        id: 7,
        name: 'Animating textures',
      }],
      selectedLesson: null,
    };
    this.currentLesson;
  }

  componentDidUpdate() {
    const {selectedLesson} = this.state;
    if (this.currentLesson && this.currentLesson.isRunning) {
      this.currentLesson.stop();
    }

    switch (selectedLesson) {
      case 1:
        this.currentLesson = new Lesson01();
        this.currentLesson.run();
        break;

      case 2:
        this.currentLesson = new Lesson02();
        this.currentLesson.run();
        break;

      case 3:
        this.currentLesson = new Lesson03();
        this.currentLesson.run();
        break;

      case 4:
        this.currentLesson = new Lesson04();
        this.currentLesson.run();
        break;

      case 5:
        this.currentLesson = new Lesson05();
        this.currentLesson.run();
        break;

      case 6:
          this.currentLesson = new Lesson06();
          this.currentLesson.run();
          break;
  
        default:
        break;
    }
  }

  selectLesson(lessonId) {
    this.setState({selectedLesson: lessonId});
  }

  renderLessons() {
    const { lessons = [], selectedLesson } = this.state;
    return (
      <div className={styles.lessons}>
        <div className={styles.title}>
          Lessons
        </div>
        {
          lessons.map(lesson => {
            const lessonClassName =
              selectedLesson === lesson.id
                ? [styles.lesson, styles.selected].join(' ')
                : styles.lesson;
            return (
              <div
                key={lesson.id}
                className={lessonClassName}
                onClick={this.selectLesson.bind(this, lesson.id)}
              >
                <span>{lesson.id}. {lesson.name}</span>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderCanvas() {
    return (
      <div className={styles.canvas}>
        <canvas id="glCanvas" width="800" height="600"></canvas>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.lessonBoard}>
        {this.renderLessons()}
        {this.renderCanvas()}
      </div>
    );
  }
}

export default LessonBoard;
