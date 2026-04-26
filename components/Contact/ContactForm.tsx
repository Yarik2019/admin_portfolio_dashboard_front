import { useState } from "react";
import { createContactData } from "@/lib/contact/operations";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [link, setLink] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactData = { name, icon, link };
    await dispatch(createContactData(contactData));
    setName("");
    setIcon("");
    setLink("");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name" className="text-xl font-bold text-black">Name</FieldLabel>
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
              <FieldLabel htmlFor="icon" className="text-xl font-bold text-black">Icon</FieldLabel>
              <Input
                id="icon"
                type="text"
                placeholder="Enter icon"
                required
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </Field>
            <Field className="mb-6">
              <FieldLabel htmlFor="link" className="text-xl font-bold text-black">Link</FieldLabel>
              <Input
                id="link"
                type="url"
                placeholder="Enter link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Field>
          </FieldGroup>
        </CardHeader>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContactForm;
