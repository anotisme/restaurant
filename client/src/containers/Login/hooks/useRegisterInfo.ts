"use client";

import { useMutation } from "@tanstack/react-query";
import { MutationKey } from "@/shared/interfaces";
import { signUp } from "@/services/auth";
import { SignInDto, SignUpDto } from "../interfaces";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function useRegisterInfo() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: registerMutation, isPending: onSubmitting } = useMutation({
    mutationKey: [MutationKey.Register],
    mutationFn: signUp,
  });

  const handleRegister = ({
    email,
    name,
    password,
    phoneNumber,
  }: SignUpDto) => {
    registerMutation(
      {
        email,
        password,
        name,
        phoneNumber,
      },
      {
        onSuccess(data) {
          if (data.data) {
            toast({
              variant: "default",
              title: "Success!",
              description: "Register successfully!",
            });
            router.push("/login");
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

  return { handleRegister, onSubmitting };
}
