"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactData } from "@/lib/contact/operations";
import {
  selectContactItems,
  selectContactLoading,
  selectContactError,
} from "@/lib/contact/selectors";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import { AppDispatch } from "@/lib/store";
import { CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading/Loading";
interface ContactItem {
  _id: string;
  name: string;
  icon: string;
  link: string;
}
const ContactPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contactData = useSelector(selectContactItems) as ContactItem[];
  const isLoading = useSelector(selectContactLoading);
  const Error = useSelector(selectContactError);
  // const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getContactData());
    };
    loadData();
  }, [dispatch]);

  return (
    <PrivateRoute>
      <CardTitle className="text-center text-2xl font-bold">
        Contact Us
      </CardTitle>

      {isLoading && (
        <Loading
          divStyle="w-full flex items-center justify-center mt-4"
          spinerStyle="size-8"
        />
      )}
      {Error && <p>Error: {Error}</p>}
      {!isLoading && !Error && (
        <div className="flex flex-col gap-3">
          {contactData.map((item) => (
            <ContactInfo key={item._id} {...item} />
          ))}

          <ContactForm />
        </div>
      )}
    </PrivateRoute>
  );
};

export default ContactPage;
