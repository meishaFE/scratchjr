import './index.less';
import React, { Component } from 'react';
import ScratchJr from '../../engine/editor/ScratchJr';
import Settings from '../../engine/config/settings.json';
import MediaLib from '../../engine/iPad/MediaLib';
import load from './load';
import Spin from '../Spin';

let submiting = false;

window.Settings = Settings;
MediaLib.loadMediaLib();

class PlayerJR extends Component {
  state = {
    loading: false,
    isLoadProject: false
  };

  componentDidMount() {
    this.loadProject();
  }

  componentWillUnmount() {
    ScratchJr.clearEventAndTimer();
  }

  loadProject = async () => {
    if (submiting) {
      return;
    }

    submiting = true;
    this.setState({ loading: true });

    try {
      const fileBase64 = await this.props.getProject();
      const data = await load(fileBase64);

      ScratchJr.appinit(data, () => {
        let scale = document.body.clientWidth / 480;
        const stageContainer = document.getElementById('stageContainer');
        const btnContainer = document.getElementById('btnContainer');
        const stage = document.getElementById('stage');
        const btnGo = document.getElementById('go');
        const btnResetall = document.getElementById('resetall');

        ScratchJr.unfocus();
        stage.owner.currentZoom = scale;
        stage.style.webkitTextSizeAdjust = scale * 100 + '%';
        ScratchJr.stage.setStageScaleAndPosition(scale, 240, 180);

        stageContainer.appendChild(stage);
        btnContainer.appendChild(btnGo);
        btnContainer.appendChild(btnResetall);

        this.setState({ isLoadProject: true });

        window.addEventListener('resize', () => {
          scale = document.body.clientWidth / 480;
          stage.owner.currentZoom = scale;
          stage.style.webkitTextSizeAdjust = scale * 100 + '%';
          ScratchJr.stage.setStageScaleAndPosition(scale, 240, 180);
        });
      });
    } catch (err) {
      console.log(err);
      $utils.errMsg(err);
    }

    this.setState({ loading: false });
    submiting = false;
  };

  /* playGame = () => {
    this.loadProject();
  }; */

  render() {
    const { isLoadProject, loading } = this.state;
    const { thumbnail } = this.props;

    return (
      <React.Fragment>
        <Spin spinning={loading}>
          <div className="stagejr">
            <div className="stageContainer" id="stageContainer">
              {/* <div className="stageCover" /> */}
            </div>
            <div className="btnContainer" id="btnContainer" />

            {/* !isLoadProject && (
              <React.Fragment>
                <div className="projectImg" style={{ backgroundImage: `url(${thumbnail})` }} />
                <div className="playBtn">
                  <img src={require('./images/btn_play.png')} alt="" onClick={this.playGame} />
                </div>
              </React.Fragment>
            ) */}
          </div>
        </Spin>

        <div id="playerHide">
          <div className="frame" id="frame" />
          <div className="libframe" id="libframe" />
          <div className="paintframe" id="paintframe" />
        </div>
      </React.Fragment>
    );
  }
}

export default PlayerJR;
