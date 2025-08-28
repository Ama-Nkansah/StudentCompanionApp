import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  ViewStyle,
  ScrollViewProps,
  Platform,
} from 'react-native';

interface ParallaxScrollViewProps extends ScrollViewProps {
  headerBackgroundColor?: { light: string; dark: string } | string;
  headerImage?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function ParallaxScrollView({
  headerBackgroundColor = { light: '#ffffff', dark: '#000000' },
  headerImage,
  children,
  style,
  ...scrollViewProps
}: ParallaxScrollViewProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerHeight] = useState(200);

  const headerBackgroundColorValue = typeof headerBackgroundColor === 'string' 
    ? headerBackgroundColor 
    : headerBackgroundColor.light;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight / 2],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 1.2],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.8, 0.6],
    extrapolate: 'clamp',
  });

  const contentTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight / 3],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, style]}>
      {/* Header Background */}
      <Animated.View
        style={[
          styles.headerBackground,
          {
            backgroundColor: headerBackgroundColorValue,
            transform: [
              { translateY: headerTranslateY },
              { scale: headerScale },
            ],
            opacity: headerOpacity,
          },
        ]}
      />

      {/* Header Image */}
      {headerImage && (
        <Animated.View
          style={[
            styles.headerImageContainer,
            {
              transform: [
                { translateY: headerTranslateY },
                { scale: headerScale },
              ],
              opacity: headerOpacity,
            },
          ]}
        >
          {headerImage}
        </Animated.View>
      )}

      {/* Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            transform: [{ translateY: contentTranslateY }],
          },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {/* Header Spacer */}
        <View style={{ height: headerHeight }} />
        
        {/* Content */}
        <View style={styles.content}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
  },
  headerImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    zIndex: 3,
  },
  contentContainer: {
    minHeight: '100%',
  },
  content: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});