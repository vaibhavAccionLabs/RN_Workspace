import React from "react";
import StarRating from "react-native-star-rating";
import Colors from "./colors";

class RatingInput extends React.PureComponent {
  handleChange = value => {
    if (!this.props.readOnly) {
      this.props.input.onChange(value);
    }
  };
  render() {
    const { props } = this;
    return (
      <StarRating
        maxStars={5}
        rating={Number(props.input.value) || 0}
        selectedStar={this.handleChange}
        starColor={Colors.primary}
      />
    );
  }
}

export default RatingInput;
