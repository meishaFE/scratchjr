import styles from './index.less';
import React from 'react';

class Index extends React.Component {
  state = {
    PlayerDynamic: null
  };

  async componentDidMount() {
    const { PlayerJR } = await import('../../src/index');
    this.setState({ PlayerDynamic: PlayerJR });
  }

  getProject = async () => {
    const dataBase64 = await import('./data/test.js');
    return dataBase64.default;
  };

  render() {
    const { PlayerDynamic } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.player}>
          {PlayerDynamic && (
            <PlayerDynamic
              thumbnail={require('./data/thumbnail.png')}
              getProject={this.getProject}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Index;
