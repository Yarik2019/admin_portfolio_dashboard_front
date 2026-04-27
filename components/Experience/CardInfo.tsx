import { useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { FieldGroup, FieldLabel, Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconEdit, IconFileWord, IconTrash } from "@tabler/icons-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { deleteExperienceDataCard, updateExperienceDataCard } from "@/lib/experience/operactions";

interface CardInfoProps {
  experienceId: string;
  _id: string;
  title: string;
  name: string;
  styles: string;
  image?: {
    url: string;
    publicId?: string;
  };
}

const CardInfo = ({
  experienceId,
  _id,
  title,
  name,
  styles,
  image,
}: CardInfoProps) => {
  const [isEditing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [nameValue, setNameValue] = useState(name);
  const [stylesValue, setStylesValue] = useState(styles);
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async ({
    experienceId,
    cardId,
  }: {
    experienceId: string;
    cardId: string;
  }) => {
    await dispatch(deleteExperienceDataCard({ experienceId, cardId }));
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
    formData.append("name", nameValue);
    formData.append("styles", stylesValue);
    if (editedImage) {
      formData.append("image", editedImage);
    }

    dispatch(updateExperienceDataCard({ experienceId, cardId: _id, formData: formData }));
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
            <FieldLabel htmlFor="name" className="text-xl font-bold text-black">
              Name: {nameValue}
            </FieldLabel>
            {isEditing && (
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel
              htmlFor="styles"
              className="text-xl font-bold text-black"
            >
              Styles: {stylesValue}
            </FieldLabel>
            {isEditing && (
              <Input
                id="demoLink"
                type="text"
                placeholder="Enter demo link"
                value={stylesValue}
                onChange={(e) => setStylesValue(e.target.value)}
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
          onClick={() => handleDelete({ experienceId, cardId: _id })}
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
