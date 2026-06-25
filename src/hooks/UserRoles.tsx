import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";

const useCurrentUser = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["current-user", user?.uid],
    enabled: !!user?.uid,

    queryFn: async () => {
      const res = await axiosInstance.get(
        `/auth/users/${user?.uid}`
      );

      return res.data.data;
    },
  });
};

export default useCurrentUser;