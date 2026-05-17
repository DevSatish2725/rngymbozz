export type MemberAction = "check-in" | "check-out";

export interface AttendanceMember {
  id: string;
  name: string;
  plan: string;
  action: MemberAction;
}

export interface RecentActivity {
  id: string;
  name: string;
  action: MemberAction;
  time: string;
}

export type AttendanceSegment = "check-in" | "recent-activity";

export interface InitialState {
  isLoading: boolean;
  allClientsAttendance: AttendanceMember[];
  error: string;
}
