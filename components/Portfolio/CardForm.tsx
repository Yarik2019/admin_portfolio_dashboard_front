import { useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createPortfolioCardItem } from "@/lib/portfolio/operations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { selectExperienceLoading } from "@/lib/experience/selectors";

const CardForm = ({ portfolioId }: { portfolioId: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectExperienceLoading);

  const FileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("demoLink", demoLink);
    formData.append("codeLink", codeLink);
    if (image) {
      formData.append("image", image);
    }
    await dispatch(createPortfolioCardItem({ portfolioId: portfolioId, formData }));
    setTitle("");
    setDescription("");
    setDemoLink("");
    setCodeLink("");
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
                htmlFor="description"
                className="text-xl font-bold text-black"
              >
                Description:
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
              <FieldLabel
                htmlFor="demoLink"
                className="text-xl font-bold text-black"
              >
                Demo Link:
              </FieldLabel>
              <Input
                id="demoLink"
                type="text"
                placeholder="Enter demo link"
                required
                value={demoLink}
                onChange={(e) => setDemoLink(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="codeLink"
                className="text-xl font-bold text-black"
              >
                Code Link:
              </FieldLabel>
              <Input
                id="codeLink"
                type="text"
                placeholder="Enter code link"
                required
                value={codeLink}
                onChange={(e) => setCodeLink(e.target.value)}
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
          <Button variant="default" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CardForm;
