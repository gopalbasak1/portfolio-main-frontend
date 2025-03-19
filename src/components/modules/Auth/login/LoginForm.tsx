"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { loginSchema } from "./loginValidation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Handshake, Unplug } from "lucide-react";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { setIsLoading } = useUser();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const redirect = searchParams.get("redirectPath");

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res.success) {
        toast.success(res.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
        }}
        className="py-6"
      >
        <div className="container mx-auto flex justify-center ">
          <div className="container p-10 bg-[#27272c] mx-auto rounded-xl shadow-lg">
            <h3 className="text-4xl text-accent text-center mb-10">
              Login to Your Account
            </h3>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-500" />
              <span className="mx-2 text-gray-400 text-lg">
                <Handshake className="text-yellow-700" />
              </span>
              <div className="flex-grow h-px bg-gray-500" />
            </div>

            {/* Form */}
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                {/* Single input field for email or phone */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl bg-[#181818] w-full"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="rounded-xl bg-[#181818] w-full"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="md"
                  className="w-full py-2 hover:text-white/65"
                >
                  {isSubmitting ? "Logging..." : "Login"}
                </Button>
              </form>
            </FormProvider>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-500" />
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-500" />
            </div>

            {/* Signup Link */}
            <p className="text-gray-400 text-center mt-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#14db99] hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LoginForm;
