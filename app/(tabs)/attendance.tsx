import AppHeader from "@/components/AppHeader";
import ShimmerFlashList from "@/components/ShimmerFlashList";
import AttendanceActivity from "@/components/attendance/AttendanceActivity";
import AttendanceCheckIn from "@/components/attendance/AttendanceCheckIn";
import AttendanceSegmentControl from "@/components/attendance/AttendanceSegmentControl";
import AttendanceShimmerCard from "@/components/attendance/AttendanceShimmerCard";
import AttendanceTopUI from "@/components/attendance/AttendanceTopUI";
import { ThemedView } from "@/components/themed-view";
import useAppDispatch from "@/hooks/use-dispatch";
import {
  allClientsAttendanceStateFn,
  isLoadingStateFn,
  updateAllClientsAttendance,
} from "@/redux/features/attendance/attendanceSlice";
import { allClientsThunk } from "@/redux/features/attendance/attendanceThunks";
import {
  AttendanceMember,
  AttendanceSegment,
  RecentActivity,
} from "@/types/attendance";
import { currentTime } from "@/utils/common";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function AttendanceDeskScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [activeSegment, setActiveSegment] =
    useState<AttendanceSegment>("check-in");

  const dispatch = useAppDispatch();

  const isLoading = useSelector(isLoadingStateFn);
  const allClientsAttendance = useSelector(allClientsAttendanceStateFn);

  useEffect(() => {
    dispatch(allClientsThunk());
  }, []);

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return allClientsAttendance;
    return allClientsAttendance.filter((m: AttendanceMember) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, allClientsAttendance]);

  const stats = useMemo(() => {
    return recentActivity.reduce(
      (acc, cum) => {
        if (cum.action === "check-in") {
          return {
            ...acc,
            checkIn: acc.checkIn + 1,
          };
        } else {
          return {
            ...acc,
            checkOut: acc.checkOut + 1,
          };
        }
      },
      { checkIn: 0, checkOut: 0 },
    );
  }, [recentActivity]);

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const onCheckIn = (member: AttendanceMember) => {
    setRecentActivity([
      { ...member, time: currentTime(), id: member.id + "check_in" },
      ...recentActivity,
    ]);
    dispatch(updateAllClientsAttendance(member.id));
  };

  const onCheckOut = (member: AttendanceMember) => {
    // Implement check-out logic here
    const getMatchedAttendance = recentActivity.find(
      (attendance) =>
        attendance.name === member.name && attendance.action === "check-out",
    );
    if (getMatchedAttendance) return;
    setRecentActivity([
      { ...member, time: currentTime(), id: member.id + "check_out" },
      ...recentActivity,
    ]);
  };

  const onSegmentChange = (segment: AttendanceSegment) => {
    setActiveSegment(segment);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <AppHeader pageName="Attendance"/>
      <View style={{ padding: 16, gap: 12, flex: 1 }}>
        <AttendanceTopUI
          memberInsideCount={stats.checkIn - stats.checkOut}
          checkedInCount={stats.checkIn}
        />
        <AttendanceSegmentControl
          activeSegment={activeSegment}
          onSegmentChange={onSegmentChange}
        />
        {isLoading ? (
          <ShimmerFlashList
            itemCount={2}
            estimatedItemSize={2}
            renderShimmerCard={({ translateX, screenWidth }) => {
              const w = screenWidth - 32;
              return (
                <AttendanceShimmerCard
                  translateX={translateX}
                  screenWidth={w}
                />
              );
            }}
          />
        ) : activeSegment === "check-in" ? (
          <AttendanceCheckIn
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            members={filteredMembers}
            onCheckIn={onCheckIn}
            onCheckOut={onCheckOut}
          />
        ) : (
          <AttendanceActivity recentActivity={recentActivity} />
        )}
      </View>
    </ThemedView>
  );
}
