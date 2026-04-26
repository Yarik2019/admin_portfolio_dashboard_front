import { useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconEdit, IconFileWord, IconTrash } from "@tabler/icons-react";
import { deleteContactData, updateContactData } from "@/lib/contact/operations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

interface ContactInfoProps {
  _id: string | number;
  name: string;
  icon: React.ReactNode;
  link: string;
}

const ContactInfo = ({ _id, name, icon, link }: ContactInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState<string>(name);
  const [editedIcon, setEditedIcon] = useState<string>(String(icon ?? ""));
  const [editedLink, setEditedLink] = useState<string>(link);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string | number) => {
    await dispatch(deleteContactData({ _id: String(id) }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    const data = {
      //   _id: _id,
      name: editedName,
      icon: editedIcon,
      link: editedLink,
    };
    dispatch(updateContactData({ contactId: _id, contactData: data }));
    setIsEditing(false);
  };

  return (
    <Card className="mt-3">
      <CardHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name" className="text-xl font-bold text-black">
              Name: {isEditing ? editedName : name}
            </FieldLabel>
            {isEditing && (
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                required
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="icon" className="text-xl font-bold text-black">
              Icon: {isEditing ? editedIcon : icon}
            </FieldLabel>
            {isEditing && (
              <Input
                id="icon"
                type="text"
                placeholder="Enter icon"
                required
                value={editedIcon}
                onChange={(e) => setEditedIcon(e.target.value)}
              />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="link" className="text-xl font-bold text-black">
              Link: {isEditing ? editedLink : link}
            </FieldLabel>
            {isEditing && (
              <Input
                id="link"
                type="text"
                placeholder="Enter link"
                required
                value={editedLink}
                onChange={(e) => setEditedLink(e.target.value)}
              />
            )}
          </Field>
        </FieldGroup>
      </CardHeader>
      <CardFooter className="flex  gap-3">
        <Button variant="destructive" onClick={() => handleDelete(_id)}>
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

export default ContactInfo;
