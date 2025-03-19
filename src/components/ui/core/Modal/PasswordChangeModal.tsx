"use client";
import { useState } from "react";
import { changePassword } from "@/services/user";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "./passwordValidation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { Input } from "../../input";
import { Button } from "../../button";
import { toast } from "sonner";
import { logout } from "@/services/AuthService";
import { Eye, EyeOff } from "lucide-react";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("newPassword");
  const passwordConfirm = form.watch("confirmPassword");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await changePassword(data.oldPassword, data.newPassword);
      if (res.success) {
        toast.success("Password updated successfully. Please log in again.");
        setTimeout(() => {
          logout();
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 " >
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-[500px] relative h-[500px] md:ml-[240px] mx-5">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-500"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>

        <div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Old Password Field */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full rounded-xl"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password Field with Toggle */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full rounded-xl"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-accent"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field with Toggle */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full rounded-xl"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-accent"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full hover:text-white p-2 rounded-xl cursor-pointer"
                disabled={!passwordConfirm || password !== passwordConfirm}
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
