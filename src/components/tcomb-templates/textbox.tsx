import React from "react";
import { View, Text, TextInput } from "react-native";
import { InputItem, WingBlank } from "antd-mobile-rn"

export const textbox = (locals: any) => {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let textboxStyle = stylesheet.textbox.normal;
  let textboxViewStyle = stylesheet.textboxView.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  const errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
    textboxViewStyle = stylesheet.textboxView.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
    textboxViewStyle = stylesheet.textboxView.notEditable;
  }

  const label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  const help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  const error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={[errorBlockStyle, { fontSize: 12 }]}>
        {locals.error}
      </Text>
    ) : null;

  const config = locals.config
  const handleTextChange = (value: string) => locals.onChange(value)
  return (
    <View style={formGroupStyle}>
      <View style={textboxViewStyle}>
        <InputItem
          ref={"input"}
          accessibilityLabel={locals.label}
          allowFontScaling={locals.allowFontScaling}
          autoCapitalize={locals.autoCapitalize}
          autoCorrect={locals.autoCorrect}
          autoFocus={locals.autoFocus}
          blurOnSubmit={locals.blurOnSubmit}
          editable={locals.editable}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={locals.multiline}
          onBlur={locals.onBlur}
          onEndEditing={locals.onEndEditing}
          onFocus={locals.onFocus}
          onLayout={locals.onLayout}
          onSelectionChange={locals.onSelectionChange}
          onSubmitEditing={locals.onSubmitEditing}
          onContentSizeChange={locals.onContentSizeChange}
          placeholderTextColor={locals.placeholderTextColor}
          secureTextEntry={locals.secureTextEntry}
          selectTextOnFocus={locals.selectTextOnFocus}
          selectionColor={locals.selectionColor}
          numberOfLines={locals.numberOfLines}
          clearButtonMode={locals.clearButtonMode}
          clearTextOnFocus={locals.clearTextOnFocus}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardAppearance={locals.keyboardAppearance}
          onKeyPress={locals.onKeyPress}
          returnKeyType={locals.returnKeyType}
          selectionState={locals.selectionState}
          onChangeText={handleTextChange}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          // style={textboxStyle}
          value={locals.value}
          testID={locals.testID}
          textContentType={locals.textContentType}
          error={locals.hasError}
          type={config.type}
          defaultValue={config.defaultValue}
          clear={config.clear}
          onErrorClick={config.onErrorClick}
          onExtraClick={config.onExtraClick}
          onVirtualKeyboardConfirm={config.onVirtualKeyboardConfirm}
          labelNumber={config.labelNumber}
          locale={config.locale}
          extra={config.extra}>
          {locals.label || ''}
        </InputItem>
      </View>
      <WingBlank size={'lg'}>
        {help}
        {error}
      </WingBlank>
    </View>
  );
}
