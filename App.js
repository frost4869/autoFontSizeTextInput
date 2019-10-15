/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import TextSize from 'react-native-text-size';

const INPUT_WIDTH = 250;
const INPUT_HEIGHT = 50;
const INPUT_PADDING = 8;
const INIT_FONTSIZE = 32;

const App = () => {
  const [textWidth, setTextWidth] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [fontSize, setFontSize] = useState(INIT_FONTSIZE);
  const [inputValue, setInputValue] = useState('');

  const measureText = value => {
    setCharCount(value.length);
    setInputValue(value);

    TextSize.measure({
      text: value,
      fontSize,
      includeFontPadding: true,
    }).then(({width}) => {
      setTextWidth(width);

      const actualWidth = INPUT_WIDTH - 80 - INPUT_PADDING * 2;

      if (width >= actualWidth) {
        const newFontSize = (INIT_FONTSIZE * actualWidth) / width;
        console.log('newFontSize', newFontSize);
        setFontSize(newFontSize);
      } else {
        setFontSize(INIT_FONTSIZE);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Text width: {textWidth}</Text>
        <Text>Char count: {charCount}</Text>
        <TextInput
          value={inputValue}
          maxLength={14}
          style={[styles.input, {fontSize: fontSize}]}
          onChangeText={measureText}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: INPUT_WIDTH,
    height: INPUT_HEIGHT,
    paddingHorizontal: INPUT_PADDING,
    paddingVertical: 0,
    borderWidth: 1,
    borderRadius: 4,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
