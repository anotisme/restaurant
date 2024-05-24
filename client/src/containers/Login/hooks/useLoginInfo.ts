"use client";

import { useMutation } from "@tanstack/react-query";
import { MutationKey } from "@/shared/interfaces";
import { signIn } from "@/services/auth";
import { SignInDto } from "../interfaces";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { setAccessToken, setRefreshToken } from "@/shared/utils/token";

export default function useLoginInfo() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: loginMutation, isPending: onSubmitting } = useMutation({
    mutationKey: [MutationKey.Login],
    mutationFn: signIn,
  });

  const handleLogin = ({ email, password }: SignInDto) => {
    loginMutation(
      {
        email,
        password,
      },
      {
        onSuccess(data) {
          if (data.data) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            router.push("/profile");
          } else {
            toast({
              variant: "destructive",
              title: "Oops!",
              description: data.message,
            });
          }
        },
        onError(error) {
          toast({
            variant: "destructive",
            title: error.name,
            description: error.message,
          });
        },
      }
    );
  };

  return { handleLogin, onSubmitting };
}
