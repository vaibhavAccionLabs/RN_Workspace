import React from "react";
import ModalSelector from "react-native-modal-selector";
import Colors from "./colors";
import View from "./View";
import Icon from "./Icon";
import Text from "./Text";
import Image from "./Image";

const Styles = {
  rootStyle: {
    flex: 1
  },
  selectStyles: {
    paddingLeft: 0,
    paddingTop: 15,
    paddingBottom: 0,
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    height: 50,
    borderBottomColor: Colors.black
  },
  textStyle: {
    textAlign: "left",
    color: Colors.black,
    fontSize: 14
  },
  light: {
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: Colors.white
  },
  transparent: {
    borderBottomColor: "transparent"
  },
  lightTextStyle: {
    color: Colors.primary,
    fontSize: 17,
    marginLeft: 5,
    marginBottom: 10
  },
  transparentTextStyle: {
    marginLeft: 5,
    textAlign: "left",
    color: Colors.black,
    fontSize: 12
  }
};

class SelectInput extends React.PureComponent {
  handleChange = selection => {
    this.props.input.onChange(selection.key);
    if (this.props.onChangeCb) {
      this.props.onChangeCb(selection.value);
    }
  };

  render() {
    const { props } = this;
    const options = props.options
      ? [
          {
            key: props.placeholder,
            label: props.placeholder,
            value: null,
            section: true
          },
          ...props.options
        ]
      : [
          {
            key: props.placeholder,
            label: props.placeholder,
            value: null,
            section: true
          }
        ];
    let { selectStyles, textStyle } = Styles;
    if (props.light) {
      selectStyles = { ...selectStyles, ...Styles.light };
      textStyle = { ...textStyle, ...Styles.lightTextStyle };
    } else if (props.transparent) {
      selectStyles = { ...selectStyles, ...Styles.transparent };
      textStyle = { ...textStyle, ...Styles.transparentTextStyle };
    }
    return (
      <View className="flex f-row">
        <ModalSelector
          style={Styles.rootStyle}
          selectTextStyle={textStyle}
          selectStyle={selectStyles}
          data={options}
          initValue={props.input.value || props.placeholder}
          onChange={this.handleChange}
          disabled={props.readOnly}
        />
        <View className="ml10 mt10">
          <Image
            className="mini_m_thumb"
            source={require("../images/icons/down_arrow_grey.png")}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

export default SelectInput;
