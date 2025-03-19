import ProjectForm from "@/components/shared/ProjectForm";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const CreateProject = async () => {
  const session = await getServerSession(authOptions);
  //console.log("p", session);
  return (
    <div>
      <ProjectForm session={session} />
    </div>
  );
};

export default CreateProject;
