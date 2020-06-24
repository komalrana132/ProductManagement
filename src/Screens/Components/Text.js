// just copy this code from the driving repo :)
import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Colors,Sizes } from "../../CommonConfig";
import { s } from "react-native-size-matters";


export default class TextComponent extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      padding,
      smallpadding,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      APPCOLOR,
      BLACK,
      LIGHTAPPCOLOR,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      BLACK && styles.BLACK,
      center && styles.center,
      padding && styles.padding,
      smallpadding && styles.smallpadding,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      APPCOLOR && styles.APPCOLOR,
      LIGHTAPPCOLOR && styles.LIGHTAPPCOLOR,
      style // rewrite predefined styles
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: Sizes.font,
    color: Colors.black
  },
  // variations
  regular: {
    fontWeight: "normal"
  },
  bold: {
    fontWeight: "bold"
  },
  semibold: {
    fontWeight: "500"
  },
  medium: {
    fontWeight: "500"
  },
  light: {
    fontWeight: "200"
  },
  // position
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  padding : {padding : Sizes.fontpadding},
  // colors
  accent: { color: Colors.accent },
  primary: { color: Colors.APPCOLOR },
  secondary: { color: Colors.LIGHTAPPCOLOR },
  tertiary: { color: Colors.tertiary },
  black: { color: Colors.black },
  white: { color: Colors.white },
  smallpadding : {padding: Sizes.smallfontpadding},
  gray: { color: Colors.gray },
  gray2: { color: Colors.gray2 },
  APPCOLOR : {color : Colors.APPCOLOR},
  LIGHTAPPCOLOR : {color : Colors.LIGHTAPPCOLOR},
  BLACK : {color : Colors.BLACK},
  // fonts
  h1: Sizes.h1,
  h2: Sizes.h2,
  h3: Sizes.h3,
  title: Sizes.title,
  body: Sizes.body,
  caption: Sizes.caption,
  small: Sizes.smallFont
});
