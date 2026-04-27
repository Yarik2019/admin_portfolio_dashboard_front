import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { IconEdit, IconFileWord, IconTrash } from "@tabler/icons-react";
import {
  deletePortfolioItem,
  updatePortfolioItem,
} from "@/lib/portfolio/operations";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import CardInfo from "./CardInfo";
import CardForm from "./CardForm";

interface CardProps {
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

interface PortfolioInfoProps {
  _id: string;
  title: string;
  description: string;
  cards: CardProps[];
}

const PortfolioInfo = ({
  _id,
  title,
  description,
  cards,
}: PortfolioInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);

  const handleEdit = () => {
    setEditing(!isEditing);
  };
  const handleEditSave = ({ portfolioId }: { portfolioId: string }) => {
    const data = { title: titleValue, description: descriptionValue };
    dispatch(updatePortfolioItem({ portfolioId, portfolioData: data }));
    setEditing(false);
  };
  const handleDelete = (id: string) => {
    dispatch(deletePortfolioItem({ _id: id }));
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
            <Button variant="outline" onClick={() => handleEditSave({ portfolioId: _id })}>
              <IconFileWord />
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="w-full flex flex-row flex-wrap gap-3 mt-3">
        {cards.map((card, index) => (
          <CardInfo key={index} {...card} portfolioId={_id} />
        ))}
        <CardForm portfolioId={_id} />
      </div>
    </div>
  );
};

export default PortfolioInfo;
