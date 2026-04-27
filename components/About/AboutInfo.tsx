import { Button } from "@/components/ui/button";
import { deleteAboutData, updateAboutData } from "@/lib/about/operations";
import { IconEdit, IconTrash, IconFileWord } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { FieldGroup, FieldLabel, Field } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { AppDispatch } from "@/lib/store";

interface AboutInfoProps {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
}

const AboutInfo = ({ _id, title, subTitle, description }: AboutInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editSubTitle, setEditSubTitle] = useState(subTitle);
  const [editDescription, setEditDescription] = useState(description);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string) => {
    await dispatch(deleteAboutData({ id }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleEditSave = async () => {
    const aboutData = {
      title: editTitle,
      subTitle: editSubTitle,
      description: editDescription,
    } as AboutInfoProps;
    await dispatch(updateAboutData({aboutId: _id, aboutData} as {aboutId: string, aboutData: AboutInfoProps}));
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
              Title: {isEditing ? editTitle : title}
            </FieldLabel>
            {isEditing && (
              <Input
                id="title"
                type="text"
                placeholder="Enter title"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel
              htmlFor="subTitle"
              className="text-xl font-bold text-black"
            >
              Sub Title: {isEditing ? editSubTitle : subTitle}
            </FieldLabel>
            {isEditing && (
              <Input
                id="subTitle"
                type="text"
                placeholder="Enter sub title"
                required
                value={editSubTitle}
                onChange={(e) => setEditSubTitle(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel
              htmlFor="description"
              className="text-xl font-bold text-black"
            >
              Description: {isEditing ? editDescription : description}
            </FieldLabel>
            {isEditing && (
              <Input
                id="description"
                type="text"
                placeholder="Enter description"
                required
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            )}
          </Field>
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
          <Button variant="outline" onClick={() => handleEditSave()}>
            <IconFileWord />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AboutInfo;
