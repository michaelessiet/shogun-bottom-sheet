import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheet, PortalProvider, multiply } from 'shogun-bottom-sheet'

export default function App() {
  const [result, setResult] = useState<number | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    multiply(3, 7).then(setResult)
  }, [])

  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <View style={styles.container}>
          <Text>Result: {result}</Text>
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
