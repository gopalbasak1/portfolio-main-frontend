"use client";
import {
  FieldValues,
  Form,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { motion } from "framer-motion";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/PFImageUploader/ImagePreviewer";
import PFImageUploader from "@/components/ui/core/PFImageUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const redirect = searchParams.get("redirectPath");

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      ...data,
      imageUrls: imagePreview,
    };
    console.log("Submitting Data before: ", modifiedData);

    try {
      const res = await registerUser(modifiedData);
      if (res.success) {
        toast.success(res?.message);
        router.refresh();
        router.push("/login");
      } else {
        toast.error(res?.message);
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
          transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
        }}
        className="py-6"
      >
        <div className="container items-center mx-auto flex justify-center my-10">
          <div className="w-[650px] mx-auto p-10 dark:bg-[#27272c] bg-[#181818] rounded-xl shadow-lg">
            <h3 className="text-4xl text-accent text-center mb-6">
              Register to Your Account
            </h3>

            {/* Form */}
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-xl bg-[#181818]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-xl bg-[#181818]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-xl bg-[#181818]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 ">
                    {imagePreview?.length > 0 ? (
                      <ImagePreviewer
                        setImageFiles={setImageFiles}
                        imagePreview={imagePreview}
                        setImagePreview={setImagePreview}
                      />
                    ) : (
                      <PFImageUploader
                        setImageFiles={setImageFiles}
                        setImagePreview={setImagePreview}
                        label="Upload Profile Image"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="rounded-xl bg-[#181818]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="rounded-xl bg-[#181818]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        {passwordConfirm && password !== passwordConfirm ? (
                          <FormMessage>Password not match</FormMessage>
                        ) : (
                          <FormMessage />
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={!!passwordConfirm && password !== passwordConfirm}
                  type="submit"
                  size="md"
                  className="w-full mx-auto py-2 hover:text-white/65"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </form>
            </FormProvider>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-500" />
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-500" />
            </div>

            {/* Social Login Buttons */}
            {/* <div className="flex flex-col gap-3">
              <Button
                onClick={() => handleSocialLogin("google")}
                variant="outline"
                className="flex items-center gap-3 justify-center w-full border-gray-500"
              >
                <FaGoogle size={20} />
                Sign in with Google
              </Button>

              <Button
                onClick={() => handleSocialLogin("github")}
                variant="outline"
                className="flex items-center gap-3 justify-center w-full border-gray-500"
              >
                <FaGithub size={20} />
                Sign in with GitHub
              </Button>
            </div> */}

            {/* Signup Link */}
            <p className="text-gray-400 text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-[#14db99] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default RegisterForm;
