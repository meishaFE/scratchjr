import styles from './index.less';
import React, { Component } from 'react';

class Spin extends Component {
  render() {
    return (
      <div className={styles.spin}>
        {this.props.children}

        <div className={styles.cover} style={{ display: this.props.spinning ? 'block' : 'none' }}>
          <div />
        </div>
      </div>
    );
  }
}

export default Spin;
