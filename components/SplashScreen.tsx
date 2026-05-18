import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  withRepeat,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { IconSymbol } from "@/components/ui/icon-symbol";
import theme from "@/app/theme/theme";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SplashScreenProps {
  onFinish: () => void;   // called when animation is done — navigate from here
  version?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Component ────────────────────────────────────────────────────────────────

export default function SplashScreen({
  onFinish,
  version = "1.0.0",
}: SplashScreenProps) {

  // ── Shared values ──
  const logoScale   = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const nameOpacity = useSharedValue(0);
  const nameY       = useSharedValue(16);
  const tagOpacity  = useSharedValue(0);
  const tagY        = useSharedValue(12);
  const barWidth    = useSharedValue(0);
  const barOpacity  = useSharedValue(0);
  const loaderOpacity = useSharedValue(0);

  // ── Animated styles ──

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const nameStyle = useAnimatedStyle(() => ({
    opacity: nameOpacity.value,
    transform: [{ translateY: nameY.value }],
  }));

  const tagStyle = useAnimatedStyle(() => ({
    opacity: tagOpacity.value,
    transform: [{ translateY: tagY.value }],
  }));

  const loaderStyle = useAnimatedStyle(() => ({
    opacity: loaderOpacity.value,
  }));

  const barStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%` as any,
    opacity: barOpacity.value,
  }));

  // ── Animation sequence ──

  useEffect(() => {
    // 1. Logo pops in
    logoScale.value = withSpring(1, {
      damping: 12,
      stiffness: 180,
    });
    logoOpacity.value = withTiming(1, { duration: 300 });

    // 2. App name fades up
    nameOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
    nameY.value       = withDelay(300, withTiming(0,  { duration: 400 }));

    // 3. Tagline fades up
    tagOpacity.value = withDelay(500, withTiming(1, { duration: 400 }));
    tagY.value       = withDelay(500, withTiming(0,  { duration: 400 }));

    // 4. Loader appears
    loaderOpacity.value = withDelay(700, withTiming(1, { duration: 300 }));

    // 5. Progress bar animates
    barOpacity.value = withDelay(750, withTiming(1, { duration: 200 }));
    barWidth.value   = withDelay(800,
      withTiming(100, {
        duration: 1800,
        easing: Easing.out(Easing.cubic),
      })
    );

    // 6. Call onFinish after all animations complete (~2.8s)
    const timer = setTimeout(() => {
      runOnJS(onFinish)();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Decorative circles */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      {/* Center content */}
      <View style={styles.content}>

        {/* Logo block */}
        <Animated.View style={[styles.logoWrap, logoStyle]}>
          <View style={styles.logoGrid}>
            <View style={[styles.logoBlock, styles.logoBlockLg]} />
            <View style={[styles.logoBlock, styles.logoBlockLg]} />
            <View style={[styles.logoBlock, styles.logoBlockSm]} />
            <View style={[styles.logoBlock, styles.logoBlockLg]} />
          </View>
        </Animated.View>

        {/* App name */}
        <Animated.Text style={[styles.appName, nameStyle]}>
          GymBoss
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, tagStyle]}>
          Gym management, simplified
        </Animated.Text>

        {/* Loader */}
        <Animated.View style={[styles.loader, loaderStyle]}>
          <View style={styles.barTrack}>
            <Animated.View style={[styles.barFill, barStyle]} />
          </View>
          <Text style={styles.loaderText}>Loading your workspace...</Text>
        </Animated.View>

      </View>

      {/* Version */}
      <Text style={styles.version}>v{version}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  // Decorative circles
  circle: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  circle1: {
    width: 320,
    height: 320,
    top: -80,
    left: -100,
  },
  circle2: {
    width: 240,
    height: 240,
    bottom: -60,
    right: -80,
    borderColor: "rgba(255,255,255,0.06)",
  },
  circle3: {
    width: 160,
    height: 160,
    top: 80,
    right: 20,
    borderColor: "rgba(255,255,255,0.05)",
  },

  // Content
  content: {
    alignItems: "center",
    gap: 0,
  },

  // Logo
  logoWrap: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logoGrid: {
    width: 48,
    height: 48,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  logoBlock: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  logoBlockLg: {
    width: 20,
    height: 20,
  },
  logoBlockSm: {
    width: 14,
    height: 14,
    alignSelf: "flex-end",
    borderRadius: 3,
  },

  // Text
  appName: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
    marginTop: 8,
  },

  // Loader
  loader: {
    marginTop: 52,
    alignItems: "center",
    gap: 12,
  },
  barTrack: {
    width: 120,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  loaderText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },

  // Version
  version: {
    position: "absolute",
    bottom: 36,
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
  },
});