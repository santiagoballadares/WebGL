import React, {Component} from 'react';
import {AppContext} from '../appContext';
import SidePanel from './sidePanel';
import LessonsUtils from '../lessons/common/lessonsUtils';

import style from './index.scss';

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentItemId: null,
      itemsList: LessonsUtils.getLessonsList(),
    };
    this.selectItem = this.selectItem.bind(this);
  }

  componentDidMount() {
    this.context.setSettings(LessonsUtils.getSettingsInitialState());
  }

  selectItem(itemId) {
    this.setState({currentItemId: itemId});
  }

  renderSidePanel() {
    const {itemsList = [], currentItemId} = this.state;
    return (
      <div className={style.sidePanel}>
        <SidePanel
          title="Lessons"
          items={itemsList}
          currentItemId={currentItemId}
          selectItem={this.selectItem}
          subMenu={LessonsUtils.getLessonSettingsComponent(this.state.currentItemId)}
        />
      </div>
    );
  }

  renderViewContainer() {
    return (
      <div className={style.viewContainer}>
        {LessonsUtils.getLessonComponent(this.state.currentItemId)}
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

MainContainer.contextType = AppContext;

export default MainContainer;
