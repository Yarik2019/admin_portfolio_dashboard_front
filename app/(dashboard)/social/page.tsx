"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocialData } from "@/lib/social/operations";
import {
  selectSocialItems,
  selectSocialLoading,
  selectSocialError,
} from "@/lib/social/selectors";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import SocialInfo from "@/components/Social/SocialInfo";
import SocialForm from "@/components/Social/SocialForm";
import { AppDispatch } from "@/lib/store";
import { CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading/Loading";
interface ContactItem {
  _id: string;
  name: string;
  icon: string;
  link: string;
}
const SocialPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socialData = useSelector(selectSocialItems) as ContactItem[];
  const isLoading = useSelector(selectSocialLoading);
  const Error = useSelector(selectSocialError);
  // const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getSocialData());
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
          {socialData.map((item) => (
            <SocialInfo key={item._id} {...item} />
          ))}

          <SocialForm />
        </div>
      )}
    </PrivateRoute>
  );
};

export default SocialPage;
