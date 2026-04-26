import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { createHomeData } from "@/lib/home/operations";
import { AppDispatch } from "@/lib/store";

interface CreateHomeData {
  title: string;
  description: string;
  link: string;
  image: File | null;
}

const HomeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [IsImage, setIsImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const FileUplpad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setIsImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    if (IsImage) {
      formData.append("image", IsImage);
    }
    await dispatch(createHomeData(formData));
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
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
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>
              <Field className="mb-6">
                <FieldLabel htmlFor="link">Link</FieldLabel>
                <Input
                  id="link"
                  type="url"
                  placeholder="Enter link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Field>
              <Field className="mb-5">
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => FileUplpad(e)}
                />
              </Field>
            </FieldGroup>
          </CardHeader>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default HomeForm;
