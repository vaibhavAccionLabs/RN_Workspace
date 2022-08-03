import React from "react";
import Video from "react-native-video";
import Styles from "./Styles";
import View from "./View";
import Spinner from "./Spinner";
import Touchable from "./Touchable";
import Icon from "./Icon";
import Overlay from "./Overlay";

class VideoPlayer extends React.PureComponent {
  state = {
    paused: false,
    buffering: false,
    loading: false,
    replay: false
  };

  loadStart = () => this.setState({ loading: true });

  loaded = () => this.setState({ loading: false });

  togglePlayback = () => this.setState({ paused: !this.state.paused });

  onEnd = () => this.setState({ replay: true });

  replay = () => {
    this.setState({ replay: false, paused: false });
    this.player.seek(0);
  };

  render() {
    return (
      <View className="screen">
        <Video
          source={{ uri: this.props.video }}
          ref={ref => {
            this.player = ref;
          }}
          rate={1.0}
          volume={1.0}
          muted={false}
          paused={this.state.paused}
          resizeMode="cover"
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          progressUpdateInterval={250.0}
          onLoadStart={this.loadStart}
          onLoad={this.loaded} // Callback when video loads
          // onProgress={this.setTime}
          onEnd={this.onEnd}
          // onError={this.videoError}
          // onBuffer={this.onBuffer}
          // onTimedMetadata={this.onTimedMetadata}
          style={Styles.coverOverlay}
        />
        <View className="flex pull-bottom">
          <Overlay>
            <View className="flex w-1-1 f-row f-both">
              {!this.state.replay ? (
                <Touchable onPress={this.togglePlayback}>
                  {this.state.paused ? (
                    <Icon name="play" size={40} color="white" />
                  ) : (
                    <Icon name="pause" size={40} color="white" />
                  )}
                </Touchable>
              ) : (
                <Touchable onPress={this.replay}>
                  <Icon name="replay" size={40} color="white" />
                </Touchable>
              )}
              <Touchable className="pull-right" onPress={this.props.onCancel}>
                <Icon name="close" color="white" size={40} />
              </Touchable>
            </View>
          </Overlay>
        </View>
        {this.state.loading && <Spinner size={30} />}
      </View>
    );
  }
}

export default VideoPlayer;
