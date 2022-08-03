// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: "#000",
    ".fontSize10": {
      	fontSize: 20
    },
    ".white" : {
    	color: "#fff",
    },
     ".grey" : {
      color: "#515c6f",
    },
    ".marginTop3" : {
      marginTop : 5
    }
  };

  return iconTheme;
};
