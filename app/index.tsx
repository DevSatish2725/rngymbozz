import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { user } from "../app/redux/slices/authSlice";

export default function Index() {
  const userDetail = useSelector(user);

  if (!userDetail) {
    return <Redirect href="/(auth)" />;
  }

  return <Redirect href="/(tabs)" />;
}
