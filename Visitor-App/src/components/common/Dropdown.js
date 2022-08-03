// import React from 'react';
// import { Dropdown } from 'react-native-material-dropdown';

// class Dropdown extends React.PureComponent {
//   handleChange = (value, index, data) => {
//     if (this.props.input) {
//       this.props.input.onChange(data[index].key);
//     }
//   };

//   render() {
//     const { props } = this;
//     const containerStyle = {
//       marginHorizontal: 5,
//       paddingVertical: 2,
//     };
//     const textFieldStyle = {
//       labelHeight: 16,
//       inputContainerStyle: {
//         paddingHorizontal: 5,
//         borderWidth: 2,
//         borderColor: '#6dd0f4',
//         borderBottomColor: '#6dd0f4',
//         borderBottomWidth: 2,
//         shadowColor: '#999',
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.6,
//         shadowRadius: 6,
//         backgroundColor: '#fff',
//       },
//       labelTextStyle: {
//         padding: 5
//       }
//     };
//     // const data = props.data
//     //   ? [...props.data]
//     //   : [];
//     // let { selectStyles, textStyle } = Styles;
//     // if (props.light) {
//     //   selectStyles = { ...selectStyles, ...Styles.light };
//     //   textStyle = { ...textStyle, ...Styles.lightTextStyle };
//     // }
//     // if (props.selectStyles) {
//     //   selectStyles = { ...selectStyles, ...props.selectStyles };
//     // }
//     // if (props.textStyle) {
//     //   textStyle = { ...textStyle, ...props.textStyle };
//     // }
//     // let initValue;
//     // if (props.initValue) {
//     //   initValue = props.initValue;
//     // } else if (props.input) {
//     //   initValue = props.input.value || props.placeholder;
//     // } else {
//     //   initValue = props.placeholder;
//     // }
//     return (
//       <Dropdown
//         onChangeText={this.handleChange}
//         rippleOpacity={0}
//         textColor="#333"
//         value={props.placeholder}
//         containerStyle={containerStyle}
//         {...textFieldStyle}
//         {...props}
//       />
//     );
//   }
// }

// export default Dropdown;
