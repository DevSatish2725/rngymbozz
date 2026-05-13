import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useShimmerAnimation(width: number) {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 1100,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [width, translateX]);

  return translateX;
}
