/**
 * @props getProject 获取项目内容，返回base64
 * @props scale 缩放比例，已480为参照
 */

import './player.less';
import React, { Component } from 'react';
import ScratchJr from '@/engine/editor/ScratchJr';
import Settings from '@/engine/config/settings.json';
import load from './load';
import MediaLib from '@/engine/iPad/MediaLib';

window.Settings = Settings;
MediaLib.loadMediaLib();

class Player extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.loadProject();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scale !== this.props.scale) {
      const stage = document.getElementById('stage');

      if (stage) {
        stage.owner.currentZoom = this.props.scale;
        stage.style.webkitTextSizeAdjust = this.props.scale * 100 + '%';
        ScratchJr.stage.setStageScaleAndPosition(this.props.scale, 240, 180);
      }
    }
  }

  componentWillUnmount() {
    ScratchJr.clearEventAndTimer();
  }

  loadProject = async () => {
    if (this.state.loading) {
      return;
    }
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
        stage.owner.currentZoom = this.props.scale;
        stage.style.webkitTextSizeAdjust = this.props.scale * 100 + '%';
        ScratchJr.stage.setStageScaleAndPosition(this.props.scale, 240, 180);

        stageContainer.appendChild(stage);
        btnContainer.appendChild(btnGo);
        btnContainer.appendChild(btnResetall);
      });
    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;

    return (
      <React.Fragment>
        <div className="stagejr">
          <div className="stageContainer" id="stageContainer" />
          <div className="btnContainer" id="btnContainer" />
        </div>

        <div id="playerHide">
          <div className="frame" id="frame" />
          <div className="libframe" id="libframe" />
          <div className="paintframe" id="paintframe" />
        </div>
      </React.Fragment>
    );
  }
}

export default Player;
