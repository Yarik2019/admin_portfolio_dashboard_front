import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { IconEdit, IconFileWord, IconTrash } from "@tabler/icons-react";
import { deleteExperienceData, updateExperienceData } from "@/lib/experience/operactions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import CardInfo from "./CardInfo";
import CardForm from "./CardForm";

interface CardProps {
  _id: string;
  title: string;
  name: string;
  styles: string;
  image: string;
}

interface ExperienceInfoProps {
  _id: string;
  title: string;
  description: string;
  cards: CardProps[];
}

const ExperienceInfo = ({
  _id,
  title,
  description,
  cards,
}: ExperienceInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);

  const handleEdit = () => {
    setEditing(!isEditing);
  };
  const handleEditSave = (experienceId: string) => {
    const data = {
      title: titleValue,
      description: descriptionValue,
    };
    dispatch(updateExperienceData({experienceId, experienceData: data}));
    setEditing(false);
  };
  const handleDelete = (id: string) => {
    dispatch(deleteExperienceData({ id }));
  };
  return (
    <div>
      <Card className="mt-3">
        <CardHeader>
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="title"
                className="text-xl font-bold text-black"
              >
                Title : {titleValue}
              </FieldLabel>
              {isEditing && (
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  required
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
                Description : {descriptionValue}
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
          </FieldGroup>
        </CardHeader>
        <CardFooter className="flex gap-3">
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

      <div className="w-full flex flex-row flex-wrap gap-3 mt-3">
        {cards.map((card, index) => (
          <CardInfo key={index} {...card} experienceId={_id} />
        ))}
        <CardForm experienceId={_id} />
      </div>
    </div>
  );
};

export default ExperienceInfo;
