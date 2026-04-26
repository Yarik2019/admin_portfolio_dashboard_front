import { useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "../ui/button";
import { IconEdit, IconTrash, IconFileWord } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { deleteHomeData, updateHomeData } from "@/lib/home/operations";
import { AppDispatch } from "@/lib/store";

interface HomeDataInfo {
  _id: string | number;
  title: string;
  description: string;
  link: string;
  image: { url: string } | null;
}

const HomeInfo = (item: HomeDataInfo) => {
  const { _id, title, description, link, image } = item;
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedLink, setEditedLink] = useState(link);
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = (id: string) => {
    const formData = new FormData();
    
    formData.append("title", editedTitle);
    formData.append("description", editedDescription);
    formData.append("link", editedLink);
    if (editedImage) {
      formData.append("image", editedImage);
    }
    dispatch(updateHomeData({ homeId: id, formData }));
    setIsEditing(false);
  };
  const handleDelete = async (id: string) => {
    await dispatch(deleteHomeData({ _id: id }));
    setIsEditing(false);
  };

  return (
    <Card className="mt-3">
      <CardHeader>
        <FieldGroup>
          <Field>
            <FieldLabel
              htmlFor="title"
              className="text-xl font-bold text-black"
            >
              Title: {title}
            </FieldLabel>
            {isEditing && (
              <Input
                id="title"
                type="text"
                placeholder="Enter title"
                required
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel
              htmlFor="description"
              className="text-xl font-bold text-black"
            >
              Description: {description}
            </FieldLabel>
            {isEditing && (
              <Input
                id="description"
                type="text"
                placeholder="Enter description"
                required
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="link" className="text-xl font-bold text-black">
              Link: {link}
            </FieldLabel>
            {isEditing && (
              <Input
                id="link"
                type="url"
                placeholder="Enter link"
                required
                value={editedLink}
                onChange={(e) => setEditedLink(e.target.value)}
              />
            )}
          </Field>
          <div className="w-full max-w-lg mb-6">
            <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
              {image?.url && (
                <img
                  src={image?.url}
                  alt="Photo"
                  className="w-full rounded-lg object-cover  dark:brightness-20"
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditedImage(file);
                  }
                }}
              />
            </Field>
          )}
        </FieldGroup>
      </CardHeader>
      <CardFooter className="flex flex-row gap-3">
        <Button variant="destructive" onClick={() => handleDelete(_id)}>
          <IconTrash />
        </Button>
        {!isEditing && (
          <Button variant="outline" onClick={handleEdit}>
            <IconEdit />
          </Button>
        )}
        {isEditing && (
          <Button variant="outline" onClick={() => handleEditSave(_id)}>
            <IconFileWord />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default HomeInfo;
