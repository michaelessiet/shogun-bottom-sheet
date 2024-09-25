import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheet, PortalProvider } from 'shogun-bottom-sheet'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <View style={styles.container}>
          <Button title="Open Bottom sheet" onPress={() => setIsOpen(true)} />
          <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
            <View style={styles.container}>
              <Text>Bottom Sheet</Text>
            </View>
          </BottomSheet>
        </View>
      </PortalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
