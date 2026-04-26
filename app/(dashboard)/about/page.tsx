"use client";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAboutData } from "@/lib/about/operations";
import {
  selectAboutItems,
  selectAboutLoading,
  selectAboutError,
} from "@/lib/about/selectors";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import AboutInfo from "@/components/About/AboutInfo";
import AboutForm from "@/components/About/AboutForm";
import Loading from "@/components/Loading/Loading";
import { CardTitle } from "@/components/ui/card";

interface AboutPageProps {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
}

const AboutPage = () => {
  const dispatch = useDispatch<any>();
  const aboutItems = useSelector(
    selectAboutItems,
  ) as unknown as AboutPageProps[];

  const isLoading = useSelector(selectAboutLoading);
  const Error = useSelector(selectAboutError);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getAboutData());
    };
    loadData();
  }, [dispatch]);

  return (
    <PrivateRoute>
      <CardTitle className="text-center text-2xl font-bold">About Us</CardTitle>
      {isLoading && (
        <Loading
          divStyle="w-full flex items-center justify-center mt-4"
          spinerStyle="size-8"
        />
      )}
      {Error && <p>Error: {Error} </p>}
      {!isLoading && !Error && (
        <div>
          {aboutItems.map((item) => (
            <div key={item?._id}>
              <AboutInfo {...item} />
            </div>
          ))}
          {aboutItems.length === 0 && <AboutForm />}
        </div>
      )}
    </PrivateRoute>
  );
};

export default AboutPage;
