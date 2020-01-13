import React, {Component} from 'react';
import classNames from 'classnames';
import {Icon} from 'semantic-ui-react';

import style from './sidePanel.scss';

class SidePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubMenuCollapsed: true,
    };
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
  }

  selectItem(itemId) {
    const {currentItemId} = this.props;
    if (currentItemId === itemId) {
      return;
    }
    this.setState({isSubMenuCollapsed: true});
    this.props.selectItem(itemId);
  }

  toggleSubMenu(event) {
    event.stopPropagation();
    this.setState((state, props) => ({
      isSubMenuCollapsed: !state.isSubMenuCollapsed,
    }));
  }

  renderItems() {
    const {items = [], currentItemId} = this.props;

    return items.map(item => {
      const className = classNames(style.item, {[style.selected]: currentItemId === item.id});

      return (
        <React.Fragment key={item.id}>
          <div
            className={className}
            onClick={this.selectItem.bind(this, item.id)}
          >
            <span>{item.id}. {item.name}</span>
            {this.renderSubMenuIcon(item.id)}
          </div>
          {this.renderSubMenu(item.id)}
        </React.Fragment>
      );
    });
  }

  renderSubMenuIcon(itemId) {
    const {subMenu, currentItemId} = this.props;
    const {isSubMenuCollapsed} = this.state;

    if (!subMenu || currentItemId !== itemId) {
      return null;
    }

    return (
      <Icon
        link
        name="cog"
        size="large"
        className={classNames(style.icon, {[style.selected]: !isSubMenuCollapsed})}
        onClick={this.toggleSubMenu}
      />
    );
  }

  renderSubMenu(itemId) {
    const {subMenu, currentItemId} = this.props;
    const {isSubMenuCollapsed} = this.state;

    if (!subMenu || currentItemId !== itemId || isSubMenuCollapsed) {
      return null;
    }

    return subMenu;
  }

  render() {
    const {title} = this.props;
    return (
      <div className={style.sidePanelRoot}>
        <div className={style.title}>
          {title}
        </div>
        {this.renderItems()}
      </div>
    );
  }

}

export default SidePanel;
