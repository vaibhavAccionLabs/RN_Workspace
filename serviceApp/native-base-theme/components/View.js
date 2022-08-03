// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const viewTheme = {
    ".padder": {
      padding: variables.contentPadding
    },
    ".flex1" : {
      flex : 1
    },
    ".f_row": {
    	flexDirection : 'row'
    },
    ".marginTop" : {
      marginTop : 30
    },
    ".f_column": {
    	flexDirection : 'column'
    },
    ".center" : {
	    justifyContent: 'center'
    },
    ".alignItemsCenter" : {
      alignItems : 'center'
    },
    ".alignItemsEnd" : {
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    ".space_between" : {
	    justifyContent: 'space-between',
    },
    ".around_between" : {
      justifyContent: 'space-around',
    },
    ".bgColorRed" : {
      backgroundColor : '#ff6969',
    },
    ".bgColorWhite" : {
      backgroundColor : '#fff',
    },
    ".w_1_2" : {
      width : '45%'
    },
    ".input" : {
      height : 50,
      borderRadius: 5,
      borderBottomColor: '#F5F5F5',
      borderLeftColor: '#F5F5F5',
      borderRightColor: '#F5F5F5',
      borderBottomWidth: 0.4,
      borderLeftWidth: 0.4,
      borderRightWidth: 0.4,
      elevation: 1,
      shadowColor: '#fff',
      shadowOffset: 10,
      shadowOpacity: 5,
      shadowRadius: 10,
      backgroundColor: '#fff'
    },
    ".circle" : {
      margin : 5,
      alignItems : 'center',
      justifyContent: 'center',
      height: 30,
      width: 30,
      borderWidth: 1,
      borderRadius: 30/2,
      borderColor: 'transparent',
    }
  };

  return viewTheme;
};
