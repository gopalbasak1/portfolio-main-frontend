import { motion } from "framer-motion";
import { ScrollArea } from "../../scroll-area";
import { Input } from "../../input";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { useState } from "react";
import ImagePreviewer from "../PFImageUploader/ImagePreviewer";
import PFImageUploader from "../PFImageUploader";
import { updateUser } from "@/services/user"; // Make sure you import updateUser function
import { toast } from "sonner";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageUrls: string[];
}

interface EditProfileModalProps {
  profile: any;
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserUpdateModal: React.FC<EditProfileModalProps> = ({
  profile,
  onClose,
  user,
}) => {
  const form = useForm({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
    },
  });
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    profile.imageUrls || []
  );

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      ...data,
      imageUrls: imagePreview.length > 0 ? imagePreview : user.imageUrls, // Keep old image if no new image
    };

    const response = await updateUser(modifiedData, user._id);

    if (response.success) {
      toast.success(response.message);
      const emailChanged = user.email !== data.email;
      if (emailChanged) {
        setTimeout(() => {
          toast.info(
            "Your email or phone number was updated. Please log in again."
          );
        }, 500);
        setTimeout(() => {
          logout();
          router.push("/login");
        }, 2500);
      }
      // Update the user state immediately
      user.name = data.name;
      user.email = data.email;
      user.phoneNumber = data.phoneNumber;
      user.imageUrls = modifiedData.imageUrls;

      onClose();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "
    >
      <ScrollArea className="rounded-xl  bg-[#181818] w-[500px] h-[400px] md:h-[550px] md:ml-[220px] mx-5 ">
        <div className="bg-[#111827] p-6 rounded-xl shadow-lg ">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            Update Profile
          </h2>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left text-white">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl bg-[#181818] text-white"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left text-white">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl bg-[#181818] text-white"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left text-white">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl bg-[#181818] text-white"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              {imagePreview.length > 0 ? (
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

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-red-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-800 hover:bg-accent hover:text-black text-white px-4 py-2 rounded-xl"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default UserUpdateModal;
