import AppHeader from "@/components/AppHeader";
import { ScreenHeader } from "@/components/ScreenHeader";
import AttendanceActivity from "@/components/attendance/AttendanceActivity";
import AttendanceCheckIn from "@/components/attendance/AttendanceCheckIn";
import AttendanceSegmentControl from "@/components/attendance/AttendanceSegmentControl";
import AttendanceTopUI from "@/components/attendance/AttendanceTopUI";
import { ThemedView } from "@/components/themed-view";
import useAppDispatch from "@/hooks/use-dispatch";
import {
  allClientsAttendanceStateFn,
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
      <AppHeader />
      <ScreenHeader screenName="Attendance" />
      <View style={{ padding: 16, gap: 12, flex: 1 }}>
        <AttendanceTopUI
          memberInsideCount={stats.checkIn - stats.checkOut}
          checkedInCount={stats.checkIn}
        />
        <AttendanceSegmentControl
          activeSegment={activeSegment}
          onSegmentChange={onSegmentChange}
        />
        {activeSegment === "check-in" ? (
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
