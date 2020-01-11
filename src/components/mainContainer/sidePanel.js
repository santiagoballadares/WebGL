import React, {Component} from 'react';
import classNames from 'classnames';

import style from './sidePanel.scss';

class SidePanel extends Component {
  selectItem(itemId) {
    this.props.selectItem(itemId);
  }

  render() {
    const { title, items = [], currentItem } = this.props;
    return (
      <div className={style.sidePanelRoot}>
        <div className={style.title}>
          {title}
        </div>
        {
          items.map(item => {
            const className = classNames(style.item, {[style.selected]: currentItem === item.id});
            return (
              <div
                key={item.id}
                className={className}
                onClick={this.selectItem.bind(this, item.id)}
              >
                <span>{item.id}. {item.name}</span>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default SidePanel;
