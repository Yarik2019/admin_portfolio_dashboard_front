import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { FieldGroup, FieldLabel, Field } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { AppDispatch } from "@/lib/store";
import { createExperienceData } from "@/lib/experience/operactions";

 interface ExperienceData {
  title: string;
  description: string;
 }

const ExperienceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ExperienceData = { title, description };
    dispatch(createExperienceData(data));
  };
  return (
    <Card className="mb-3">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="title"
                className="text-xl font-bold text-black"
              >
                Title
              </FieldLabel>
              <Input
                name="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field className="mb-3">
              <FieldLabel
                htmlFor="description"
                className="text-xl font-bold text-black"
              >
                Description
              </FieldLabel>
              <Input
                name="description"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
        </CardHeader>
        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ExperienceForm;
