import React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Touchable, Text, View } from "./";
import moment from "moment";

class DateTimeInput extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      pickerVisible: false
    };
  }

  togglePicker = () => {
    if (!this.props.readOnly) {
      this.setState({ pickerVisible: !this.state.pickerVisible });
    }
  };

  confirm = value => {
    if (this.props.onChangeCallback) {
      this.props.onChangeCallback(value);
    }
    this.props.input.onChange(value);
    this.togglePicker();
  };

  render() {
    const { props } = this;
    const format = props.mode === "date" ? "DD/MM/YYYY" : "hh:mm a";
    let { value } = props.input;
    if (!value) {
      value = new Date();
    } else if (typeof props.input.value === "string") {
      value = new Date(props.input.value);
    }

    return (
      <Touchable className="j-end" onPress={this.togglePicker}>
        <View className="mv15 mh15">
          <Text className="mr30 small">{moment(value).format(format)}</Text>
          <DateTimePicker
            isVisible={this.state.pickerVisible}
            onConfirm={this.confirm}
            onCancel={this.togglePicker}
            mode={props.mode}
            date={value}
          />
        </View>
      </Touchable>
    );
  }
}

export default DateTimeInput;
