import React, {Component} from 'react';
import Lesson01 from './lessons/lesson01';
import Lesson02 from './lessons/lesson02';

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
  }

  componentDidUpdate() {
    const {selectedLesson} = this.state;
    let lesson;

    switch (selectedLesson) {
      case 1:
        lesson = new Lesson01();
        lesson.run();
        break;

      case 2:
        lesson = new Lesson02();
        lesson.run();
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
                ?[styles.lesson, styles.selected].join(' ')
                : styles.lesson;
            return (
              <div
                key={lesson.id}
                className={lessonClassName}
                onClick={this.selectLesson.bind(this, lesson.id)}
              >
                <span>{lesson.name}</span>
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
