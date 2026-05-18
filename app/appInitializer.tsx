import storage from "@/config/storage";
import useAppDispatch from "@/hooks/use-dispatch";
import { useEffect } from "react";

import {
  finishLoading,
  setAuthenticated,
} from "../redux/features/auth/authSlice";

export default function AppInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const bootstrap = async () => {
      const token = await storage.getItem("token");
      if (token) {
        dispatch(setAuthenticated(token));
      } else {
        dispatch(finishLoading());
      }
    };

    bootstrap();
  }, []);

  return null;
}
