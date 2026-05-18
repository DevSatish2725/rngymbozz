import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BAR_COLOR } from '@/constants/dashboard'
import { PeakHour } from '@/types/dashboart';
import theme from '@/app/theme/theme';

const PeakBar = ({ item, maxPct }: { item: PeakHour; maxPct: number }) => {
      const isPeak = item.percentage === maxPct;
  return (
    <View style={styles.barWrap}>
             <View style={styles.barTrack}>
               <View
                 style={[
                   styles.bar,
                   {
                     height: `${item.percentage}%` as any,
                     backgroundColor: BAR_COLOR(item.percentage),
                   },
                 ]}
               />
             </View>
             <Text style={[styles.barLabel, isPeak && styles.barLabelPeak]}>
               {item.label}
             </Text>
           </View>
  )
}

export default PeakBar

const styles = StyleSheet.create({
     barWrap: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },
  barTrack: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 9,
    color: "#9ca3af",
    textAlign: "center",
  },
  barLabelPeak: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
})