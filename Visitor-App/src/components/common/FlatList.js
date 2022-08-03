import React from "react";
import { FlatList as NativeFlatList } from "react-native";
import Styles from "./Styles";

export default props => {
  const style = [];
  if (props.className) {
    const classNames = props.className.split(" ");
    classNames.forEach(className => {
      style.push(Styles[className]);
    });
  }
  return (
    <NativeFlatList
      style={style}
      data={props.data}
      keyExtractor={props.keyExtractor}
      renderItem={props.renderItem}
      renderSeparator={props.renderSeparator}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
      onEndReached={props.onEndReached}
      onEndReachedThreshold={props.onEndReachedThreshold}
    />
  );
};
