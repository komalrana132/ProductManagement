import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Sizes } from "../../CommonConfig";
import { s } from "react-native-size-matters";

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}
        >
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  startColor: Colors.APPCOLOR,
  endColor: Colors.LIGHTAPPCOLOR,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: Colors.WHITE
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: Sizes.radius,
    justifyContent: "center",
    marginVertical: Sizes.padding / 3,
    backgroundColor : "transparent",
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation : 4,
  },
  accent: { backgroundColor: Colors.accent },
  primary: { backgroundColor: Colors.APPCOLOR },
  secondary: { backgroundColor: Colors.LIGHTAPPCOLOR },
  tertiary: { backgroundColor: Colors.tertiary },
  black: { backgroundColor: Colors.black },
  white: { backgroundColor: Colors.white },
  gray: { backgroundColor: Colors.gray },
  gray2: { backgroundColor: Colors.gray2 },
  gray3: { backgroundColor: Colors.gray3 },
  gray4: { backgroundColor: Colors.gray4 }
});
