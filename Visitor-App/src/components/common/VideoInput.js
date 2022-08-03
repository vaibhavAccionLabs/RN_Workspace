import React from "react";
import { Modal } from "react-native";
import Touchable from "./Touchable";
import Icon from "./Icon";
import View from "./View";
import Spinner from "./Spinner";
import VideoPlayer from "./VideoPlayer";
import Image from "./Image";

class VideoInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playerVisible: false,
      recorderVisible: false,
      uploading: false,
      video: null
    };
  }

  componentDidMount() {
    if (this.props.input.value !== "") {
      this.setState({ video: this.props.input.value });
    }
  }

  toggleRecorder = () => {
    this.setState({ recorderVisible: !this.state.recorderVisible });
  };

  togglePlay = () => {
    this.setState({ playerVisible: !this.state.playerVisible });
  };

  render() {
    return (
      <View className="mh15">
        {this.state.video && (
          <Touchable onPress={this.togglePlay}>
            <Icon name="play" size={26} />
          </Touchable>
        )}
        {this.state.playerVisible && (
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.playerVisible}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
          >
            <View className="screen">
              <VideoPlayer
                onCancel={this.togglePlay}
                video={this.state.video}
              />
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

export default VideoInput;
