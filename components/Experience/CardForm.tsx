import { useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createExperienceDataCard } from "@/lib/experience/operactions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { selectPortfolioLoading } from "@/lib/portfolio/selectors";

const CardForm = ({ experienceId }: { experienceId: string }) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [styles, setStyles] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const IsLoading = useSelector(selectPortfolioLoading);
  console.log(IsLoading);
  const FileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("styles", styles);
    if (image) {
      formData.append("image", image);
    }
    await dispatch(createExperienceDataCard({experienceId, formData }));
    setTitle("");
    setName("");
    setStyles("");
    setImage(null);
  };

  return (
    <Card className="w-full lg:w-2/6">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="title"
                className="text-xl font-bold text-black"
              >
                Title:
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
              <FieldLabel
                htmlFor="name"
                className="text-xl font-bold text-black"
              >
                Name:
              </FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="styles"
                className="text-xl font-bold text-black"
              >
                Styles:
              </FieldLabel>
              <Input
                id="styles"
                type="text"
                placeholder="Enter styles"
                required
                value={styles}
                onChange={(e) => setStyles(e.target.value)}
              />
            </Field>
            <Field className="mb-5">
              <FieldLabel
                htmlFor="image"
                className="text-xl font-bold text-black"
              >
                Image:{" "}
              </FieldLabel>
              <Input
                id="image"
                type="file"
                accept="image/*"
                required
                onChange={(e) => FileUpload(e)}
              />
            </Field>
          </FieldGroup>
        </CardHeader>
        <CardFooter>
          <Button variant="default" disabled={IsLoading}>
            {IsLoading ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CardForm;
