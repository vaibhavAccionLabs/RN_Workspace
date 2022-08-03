// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
	const rightTheme = {
		'NativeBase.Button': {
			alignSelf: null,
		},
		flex: 1,
		alignSelf: 'center',
		alignItems: 'flex-end',
		".circle" : {
			margin : 5,
			alignItems : 'center',
			justifyContent: 'center',
			height: 10,
			backgroundColor : '#fff',
			borderWidth: 0.5,
			borderRadius: 10/2,
			borderColor: '#078CD6',
		}
	};
	return rightTheme;
};
