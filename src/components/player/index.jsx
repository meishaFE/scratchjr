import './index.less';
import React, { Component } from 'react';
import ScratchJr from '../../engine/editor/ScratchJr';
import Settings from '../../engine/config/settings.json';
import MediaLib from '../../engine/iPad/MediaLib';
import load from './load';
import Spin from '../Spin';

let submiting = false;

class PlayerJR extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    window.sjrStatic = this.props.staticUrl;
    window.Settings = Settings;
    if (this.props.stageColor) window.Settings.stageColor = this.props.stageColor;
    MediaLib.loadMediaLib();
    this.loadProject();
  }

  componentWillUnmount() {
    ScratchJr.clearEventAndTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.width !== this.props.width && this.props.width) {
      this.stageResize();
    }
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
        const stageContainer = document.getElementById('stageContainer');
        const btnContainer = document.getElementById('btnContainer');
        const stage = document.getElementById('stage');
        const btnGo = document.getElementById('go');
        const btnResetall = document.getElementById('resetall');

        ScratchJr.unfocus();
        this.stageResize();

        stageContainer.appendChild(stage);
        btnContainer.appendChild(btnGo);
        btnContainer.appendChild(btnResetall);

        this.setState({ isLoadProject: true });
      });
    } catch (err) {
      console.log('载入项目失败');
      console.log(err);
    }

    this.setState({ loading: false });
    submiting = false;
  };

  stageResize = () => {
    const scale = this.props.width / 480;
    const btnContainer = document.getElementById('btnContainer');
    const stage = document.getElementById('stage');

    stage.owner.currentZoom = scale;
    stage.style.webkitTextSizeAdjust = scale * 100 + '%';
    ScratchJr.stage.setStageScaleAndPosition(scale, 240, 180);
    btnContainer.style.transform = `scale(${scale})`;
    btnContainer.style.webkitTransform = `scale(${scale})`;
  };

  render() {
    const { loading } = this.state;
    const { width } = this.props;
    const height = width * 0.75;

    return (
      <React.Fragment>
        <Spin spinning={loading}>
          <div className="stagejr" id="scratchWrapper" style={{ width: `${width}px` }}>
            <div
              className="stageContainer"
              id="stageContainer"
              style={{ width: `${width}px`, height: `${height}px` }}
            ></div>
            <div className="btnContainer" id="btnContainer" />
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
