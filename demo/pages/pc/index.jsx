import styles from './index.less';
import React from 'react';

class Index extends React.Component {
  state = {
    PlayerDynamic: null
  };

  async componentDidMount() {
    const { PlayerJR } = await import('../../../src/index');
    this.setState({ PlayerDynamic: PlayerJR });
  }

  getProject = async () => {
    const res = await fetch('/proFile/demo.sjr');
    const base64 = await res.text();
    return base64;
  };

  render() {
    const { PlayerDynamic } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.player}>
          {PlayerDynamic && (
            <PlayerDynamic
              width="480"
              stageColor="#ffffff"
              staticUrl="/static/scratchjr"
              getProject={this.getProject}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Index;
