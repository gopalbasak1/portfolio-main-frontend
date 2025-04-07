/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImagePreviewer from "../ui/core/PFImageUploader/ImagePreviewer";
import PFImageUploader from "../ui/core/PFImageUploader";
import { addProject } from "@/services/project";

// Define the form data type
export type ProjectData = {
  title: string;
  description: string;
  liveLink: string;
  imageUrls?: string[] | [];
  session: string | null;
  category: string;
  stack: string | { name: string }[]; // ✅ Allow stack to be a string OR an array
  github: string;
};

const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    control, // Required for Controller
    formState: { errors },
  } = useForm<ProjectData>({
    defaultValues: {
      title: "",
      description: "",
      liveLink: "",
      category: "",
      stack: [],
      github: "",
    },
  });
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ProjectData) => {
    try {
      setLoading(true);

      // Ensure stack is an array of objects
      const stackArray =
        typeof data.stack === "string"
          ? data.stack
              .split(",")
              .map((tech) => ({ name: tech.trim() }))
              .filter((tech) => tech.name !== "")
          : Array.isArray(data.stack)
          ? data.stack
          : [];

      if (stackArray.length === 0) {
        toast.error("At least one stack technology is required.");
        setLoading(false);
        return;
      }

      // Ensure image URLs exist
      const imageUrls = imagePreview.length > 0 ? imagePreview : [];

      const formattedData = {
        title: data.title,
        description: data.description,
        liveLink: data.liveLink,
        imageUrls: imageUrls, // Ensure images are included
        github: data.github,
        category: data.category,
        stack: stackArray,
      };

      // console.log("📤 Sending Data:", formattedData);
      const res = await addProject(formattedData);

      if (res.success) {
        toast.success("Project created successfully!");
        router.push(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/admin/dashboard/project/allProject`
        );
        router.refresh(); // ✅ Ensure UI updates
      } else {
        toast.error(`Error: ${res.message}`);
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6 "
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto  p-6 md:p-8 rounded-xl shadow-lg">
          <h3 className="text-4xl text-accent text-center mb-6">
            Create Your Project
          </h3>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Title & Live Link */}
            <div className="flex md:flex-row flex-col gap-5">
              <div>
                <label className="text-white">Project Title *</label>
                <Input
                  className="rounded-xl bg-[#181818]"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Project Title"
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="text-white">Live Link *</label>
                <Input
                  className="rounded-xl bg-[#181818]"
                  type="text"
                  {...register("liveLink", {
                    required: "Live link is required",
                  })}
                  placeholder="Project Live Link"
                />
                {errors.liveLink && (
                  <p className="text-red-500">{errors.liveLink.message}</p>
                )}
              </div>
            </div>

            {/* GitHub & Image Upload */}
            <div className="flex md:flex-row flex-col gap-5">
              <div>
                <label className="text-white">GitHub Repository URL *</label>
                <Input
                  className="rounded-xl bg-[#181818]"
                  type="text"
                  {...register("github", {
                    required: "GitHub URL is required",
                  })}
                  placeholder="GitHub Repository URL"
                />
                {errors.github && (
                  <p className="text-red-500">{errors.github.message}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <p className="">Images </p>
                </div>
                <div className="flex gap-4 ">
                  <PFImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Image"
                    className="w-fit mt-0"
                  />
                  <ImagePreviewer
                    className="flex flex-wrap gap-4"
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
              </div>
            </div>

            {/* Category Selection using Controller */}
            <div>
              <label className="text-white">Category *</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-[#181818]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818]">
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="Frontend">Frontend</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                        <SelectItem value="Mern-Stack">Mern-Stack</SelectItem>
                        <SelectItem value="Full-stack">Full-stack</SelectItem>
                        <SelectItem value="Mobile-App">Mobile-App</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Tech Stack & Description */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-white">
                  Tech Stack (comma-separated) *
                </label>
                <Textarea
                  className="rounded-xl h-48 bg-[#181818]"
                  {...register("stack", {
                    required: "Stack is required",
                    validate: (value) =>
                      (typeof value === "string" && value.trim().length > 0) ||
                      "Stack cannot be empty",
                  })}
                  placeholder="Enter stack (e.g., React, Tailwind, Node.js)"
                />

                {errors.stack && (
                  <p className="text-red-500">{errors.stack.message}</p>
                )}
              </div>

              <div>
                <label className="text-white">Project Description *</label>
                <Textarea
                  className="rounded-xl h-48 bg-[#181818]"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Project Description"
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full py-2 hover:text-white/65">
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectForm;
