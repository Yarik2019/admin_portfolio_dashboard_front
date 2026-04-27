import { useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { FieldGroup, FieldLabel, Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconEdit, IconFileWord, IconTrash } from "@tabler/icons-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import {
  deletePortfolioCardItem,
  updatePortfolioCardItem,
} from "@/lib/portfolio/operations";

interface CardInfoProps {
  portfolioId: string;
  _id: string;
  title: string;
  description: string;
  demoLink: string;
  codeLink: string;
  image?: {
    url: string;
    publicId?: string;
  };
}

const CardInfo = ({
  portfolioId,
  _id,
  title,
  description,
  demoLink,
  codeLink,
  image,
}: CardInfoProps) => {
  const [isEditing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [demoLinkValue, setDemoLinkValue] = useState(demoLink);
  const [codeLinkValue, setCodeLinkValue] = useState(codeLink);
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async ({
    portfolioId,
    cardId,
  }: {
    portfolioId: string;
    cardId: string;
  }) => {
    await dispatch(deletePortfolioCardItem({ portfolioId, cardId }));
  };

  const handleEdit = () => {
    setEditing(!isEditing);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedImage(file);
    }
  };

  const handleEditSave = () => {
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("description", descriptionValue);
    formData.append("demoLink", demoLinkValue);
    formData.append("codeLink", codeLinkValue);
    if (editedImage) {
      formData.append("image", editedImage);
    }
    console.log({ portfolioId, cardId: _id, formData });
    dispatch(updatePortfolioCardItem({ portfolioId, cardId: _id, formData }));
    setEditing(false);
  };

  return (
    <Card className="w-full lg:w-2/6">
      <CardHeader>
        <FieldGroup>
          <Field>
            <FieldLabel
              htmlFor="title"
              className="text-xl font-bold text-black"
            >
              Title: {titleValue}
            </FieldLabel>
            {isEditing && (
              <Input
                id="title"
                type="text"
                placeholder="Enter title"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel
              htmlFor="description"
              className="text-xl font-bold text-black"
            >
              Description: {descriptionValue}
            </FieldLabel>
            {isEditing && (
              <Input
                id="description"
                type="text"
                placeholder="Enter description"
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel
              htmlFor="demoLink"
              className="text-xl font-bold text-black"
            >
              Demo Link: {demoLinkValue}
            </FieldLabel>
            {isEditing && (
              <Input
                id="demoLink"
                type="text"
                placeholder="Enter demo link"
                value={demoLinkValue}
                onChange={(e) => setDemoLinkValue(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel
              htmlFor="codeLink"
              className="text-xl font-bold text-black"
            >
              Code Link: {codeLinkValue}
            </FieldLabel>
            {isEditing && (
              <Input
                id="codeLink"
                type="text"
                placeholder="Enter code link"
                value={codeLinkValue}
                onChange={(e) => setCodeLinkValue(e.target.value)}
              />
            )}
          </Field>
          <div className="w-full mb-6">
            <AspectRatio ratio={16 / 9} className="w-full rounded-lg bg-muted">
              {image?.url && (
                <img
                  src={image?.url}
                  alt="Photo"
                  className="w-full rounded-lg object-cover dark:brightness-20"
                />
              )}
            </AspectRatio>
          </div>
          {isEditing && (
            <Field className="mb-6">
              <FieldLabel htmlFor="image">Image</FieldLabel>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              />
            </Field>
          )}
        </FieldGroup>
      </CardHeader>
      <CardFooter className="flex gap-3">
        <Button
          variant="destructive"
          onClick={() => handleDelete({ portfolioId, cardId: _id })}
        >
          <IconTrash />
        </Button>
        {!isEditing && (
          <Button variant="outline" onClick={handleEdit}>
            <IconEdit />
          </Button>
        )}
        {isEditing && (
          <Button variant="outline" onClick={handleEditSave}>
            <IconFileWord />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default CardInfo;
