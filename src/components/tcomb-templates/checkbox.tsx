import React from "react";
import { View, Text, Switch } from "react-native";
import { Checkbox } from "@ant-design/react-native"

const AgreeItem = Checkbox.AgreeItem;

export const checkbox = (locals: any) => {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let checkboxStyle = stylesheet.checkbox.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  const errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    checkboxStyle = stylesheet.checkbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  const label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  const help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  const error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  const config = locals.config
  const handleOnChange = (e: any) => { locals.onChange(e.target.checked); console.log(e.target.checked) }
  return (
    <View style={formGroupStyle}>
      <AgreeItem
        ref={"input"}
        accessibilityLabel={locals.label}
        disabled={locals.disabled}
        onTintColor={locals.onTintColor}
        thumbTintColor={locals.thumbTintColor}
        tintColor={locals.tintColor}
        style={checkboxStyle}
        onValueChange={handleOnChange}
        onChange={handleOnChange}
        value={locals.value}
        testID={locals.testID}
        defaultChecked={config.defaultChecked}
        checked={config.defaultChecked}
      >
        {locals.label}
      </AgreeItem>
      {help}
      {error}
    </View>
  );
}
