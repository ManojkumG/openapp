import { StatusBar } from 'expo-status-bar';
import { type JSX } from 'react';
import { StyleSheet, View } from 'react-native';

import AuthScreen from './src/screens/AuthScreen';

export default function App(): JSX.Element {
  return (
    <View style={styles.safeArea}>
      <StatusBar hidden />
      <AuthScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f5efe3',
    flex: 1,
    height: '100%',
    minHeight: '100%',
  },
});
