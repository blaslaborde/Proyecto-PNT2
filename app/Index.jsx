import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';

export default function index() {
  return (
    <View style={styles.container}>
      <Card/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});