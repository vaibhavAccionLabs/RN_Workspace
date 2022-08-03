// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const textTheme = {
    ".note": {
      color: "#a7a7a7",
      fontSize: variables.noteFontSize
    }, 
    ".white": {
      color: "#fff"
    },
    ".red": {
      color: "#FF0000"
    },
    ".bold": {
      fontWeight : '600'
    },
    ".grey" : {
      color : "#515c6f"
    },
    ".lgBlue": {
      color: "#078CD6"
    },
    ".center": {
      textAlign: "center"
    },
    ".left": {
      textAlign: "left"
    },
    ".right": {
      textAlign: "right"
    },
    ".marginLeft10" : {
      marginLeft : 10
    },
    ".marginRight10" : {
      marginRight : 10
    },
    ".fontSize18" : {
      fontSize: 18
    },
    ".fontSize14" : {
      fontSize: 8
    }
  };

  return textTheme;
};
