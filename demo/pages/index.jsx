import React from 'react';

class Index extends React.Component {
  state = {
    PlayerDynamic: null
  };

  async componentDidMount() {
    const { PlayerJR } = await import('../../src/index');
    console.log(PlayerJR);
    this.setState({ PlayerDynamic: PlayerJR });
  }

  render() {
    return <div>hello</div>;
  }
}

export default Index;
