"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";

interface MoleculeForm {
  name: string;
  file: FileList;
}

const NewMoleculePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<MoleculeForm>();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          setSubmitting(true);
          const rawFile = data.file[0];
          let fileContent = "";

          if (rawFile) {
            fileContent = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = () => reject(reader.error);
              reader.readAsText(rawFile);
            });
          }
          axios.post("/api/molecules", {
            name: data.name,
            file: fileContent,
          });
          router.push("/molecules");
        } catch (error) {
          setError("An error Occurred");
        }
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Molecule Name" {...register("name")} />
      </TextField.Root>
      <div>
        <input type="file" {...register("file")}></input>
      </div>
      <Button disabled={submitting}>
        Add Molecule
        {submitting && <Spinner />}
      </Button>
    </form>
  );
};

export default NewMoleculePage;
