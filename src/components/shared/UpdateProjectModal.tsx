/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";

interface Project {
  _id: string;
  title: string;
  description: string;
  liveLink: string;
  github: string;
  category: string;
  stack: { name: string }[];
  image: string;
}

interface UpdateProjectModalProps {
  project: Project;
  onClose: () => void;
  router: any;
}

interface FormErrors {
  title?: string;
  description?: string;
  liveLink?: string;
  github?: string;
  category?: string;
  stack?: string;
}

const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({
  project,
  onClose,
  router,
}) => {
  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");
  const [liveLink, setLiveLink] = useState(project.liveLink || "");
  const [github, setGithub] = useState(project.github || "");
  const [category, setCategory] = useState(project.category || "");
  const [stack, setStack] = useState(
    project.stack?.map((s) => s.name).join(", ") || ""
  );
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {}; // Explicitly typing the object

    if (!title.trim()) newErrors.title = "Title is required";
    if (!liveLink.trim()) newErrors.liveLink = "Live link is required";
    if (!github.trim()) newErrors.github = "GitHub URL is required";
    if (!category) newErrors.category = "Category is required";
    if (!stack.trim()) newErrors.stack = "Stack is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      let imageUrl = project.image;

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
          "upload_preset",
          `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
        );

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error("Image upload failed");
        }
        imageUrl = data.secure_url;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${project._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            liveLink,
            github,
            category,
            stack: stack.split(",").map((s) => ({ name: s.trim() })),
            image: imageUrl,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      toast.success("Project updated successfully!");
      onClose(); // Close modal after update
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="fixed inset-0 bg-[#111827] bg-opacity-50 flex justify-center items-center px-4"
    >
      <ScrollArea className="h-[700px] rounded-xl border p-2 bg-[#181818]">
        <div className="bg-[#111827] p-6 rounded-xl w-full max-w-lg shadow-lg max-h-[90vh] ">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            Update Project
          </h2>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="text-white">Project Title *</label>
              <Input
                type="text"
                className="w-full p-2 text-white rounded-xl bg-[#181818]"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            {/* Live Link */}
            <div>
              <label className="text-white">Live Link *</label>
              <Input
                type="text"
                className="w-full p-2  text-white rounded-xl bg-[#181818]"
                placeholder="Live Link"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
              />
              {errors.liveLink && (
                <p className="text-red-500">{errors.liveLink}</p>
              )}
            </div>

            {/* GitHub URL */}
            <div>
              <label className="text-white">GitHub Repository URL *</label>
              <Input
                type="text"
                className="w-full p-2 text-white rounded-xl bg-[#181818]"
                placeholder="GitHub Repository URL"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
              {errors.github && <p className="text-red-500">{errors.github}</p>}
            </div>

            {/* Category */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full bg-[#1c1c22] text-white border border-gray-600 rounded-xl">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c1c22] text-white">
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="Mern-Stack">Mern-Stack</SelectItem>
                <SelectItem value="Full-stack">Full-stack</SelectItem>
                <SelectItem value="Mobile-App">Mobile-App</SelectItem>
              </SelectContent>
            </Select>
            {/* Stack */}
            <div>
              <label className="text-white">
                Tech Stack (comma-separated) *
              </label>
              <Textarea
                className="w-full p-2  text-white rounded-xl bg-[#181818]"
                placeholder="Enter stack (e.g., Html 5, Css 3, JavaScript)"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
              />
              {errors.stack && <p className="text-red-500">{errors.stack}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-white">Project Description *</label>
              <Textarea
                className="w-full p-2  text-white rounded-xl bg-[#181818]"
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-white">Upload New Image</label>
              <Input
                type="file"
                className="w-full p-2  text-white rounded-xl bg-[#181818]"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]); // Now TypeScript knows it's safe
                  }
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-red-400"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-cyan-800 hover:bg-accent hover:text-black text-white px-4 py-2 rounded-xl"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default UpdateProjectModal;
