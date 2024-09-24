import { Portal } from '@gorhom/portal'
import React, { useEffect } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import {
  Gesture,
  GestureDetector,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface BottomSheetProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export function BottomSheet(props: BottomSheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT)
  const contentHeight = useSharedValue(0)
  const { isOpen, setIsOpen, children } = props

  useEffect(() => {
    if (isOpen) {
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 70,
      })
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT)
    }
  }, [isOpen, translateY])

  const panGestureEvent = Gesture.Pan()
    .onStart(({}) => {})
    .onUpdate(({ translationY }) => {
      translateY.value = Math.max(translationY, 0)
    })
    .onEnd((event) => {
      const shouldClose =
        event.velocityY > 500 ||
        (event.translationY > 0 && event.translationY > contentHeight.value / 3)
      if (shouldClose) {
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 1000 }, () => {
          runOnJS(setIsOpen)(false)
        })
      } else {
        translateY.value = withTiming(0)
      }
    })

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateY.value, [SCREEN_HEIGHT, 0], [0, 1]),
    }
  })

  const onLayout = (event: any) => {
    event.persist()
    contentHeight.value = event.nativeEvent?.layout?.height
  }

  return (
    <Portal>
      {isOpen && (
        <Animated.View style={[StyleSheet.absoluteFill]}>
          <TouchableWithoutFeedback
            style={{ height: SCREEN_HEIGHT }}
            onPress={() =>
              (translateY.value = withTiming(SCREEN_HEIGHT, {}, () =>
                runOnJS(setIsOpen)(false)
              ))
            }
          >
            <Animated.View style={[styles.backdrop, rBackdropStyle]} />
          </TouchableWithoutFeedback>
          <GestureDetector gesture={panGestureEvent}>
            <Animated.View
              style={[styles.bottomSheetContainer, rBottomSheetStyle]}
            >
              <View style={styles.line} />
              <KeyboardAvoidingView behavior="height">
                <ScrollView>
                  <View onLayout={onLayout}>{children}</View>
                </ScrollView>
              </KeyboardAvoidingView>
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      )}
    </Portal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 18,
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: 2,
  },
})
