import { useState } from "react";
import { createAboutData } from "@/lib/about/operations";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
} from "@/components/ui/card";

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
interface AboutCreateState {
  title: string;
  subTitle: string;
  description: string;
}
const AboutForm = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: AboutCreateState = { title, subTitle, description };
    await dispatch(createAboutData(data));
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <form onSubmit={handleCreate}>
          <FieldGroup className="p-3">
            <Field>
              <FieldLabel htmlFor="title" className="text-xl font-bold text-black">
                Title
              </FieldLabel>
              <Input
                id="title"
                type="text"
                placeholder="Enter title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="subTitle" className="text-xl font-bold text-black">
                Sub Title
              </FieldLabel>
              <Input
                id="subTitle"
                type="text"
                placeholder="Enter sub title"
                required
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description" className="text-xl font-bold text-black">
                Description
              </FieldLabel>
              <Input
                id="description"
                type="text"
                placeholder="Enter description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
            <Field>
              <Button type="submit">Create</Button>
            </Field>
          </FieldGroup>
        </form>
      </Card>
    </div>
  );
};

export default AboutForm;
