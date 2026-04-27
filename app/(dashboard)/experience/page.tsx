"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExperienceData } from "@/lib/experience/operactions";
import {
  selectExperienceItems,
  selectExperienceLoading,
  selectExperienceError,
} from "@/lib/experience/selectors";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import Loading from "@/components/Loading/Loading";
import { CardTitle } from "@/components/ui/card";
import ExperienceInfo from "@/components/Experience/ExperienceInfo";
import ExperienceForm from "@/components/Experience/ExperienceForm";
import { AppDispatch } from "@/lib/store";

interface ExperienceCard {
  _id: string;
  title: string;
  name: string;
  styles: string;
  image?: {
    url: string;
    publicId?: string;
  };
}

interface ExperiencePageProps {
  _id: string;
  title: string;
  description: string;
  cards: ExperienceCard[];
}

const ExperiencePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const experienceData = useSelector(
    selectExperienceItems,
  ) as ExperiencePageProps[];
  const isLoading = useSelector(selectExperienceLoading);
  const Error = useSelector(selectExperienceError);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getExperienceData());
    };
    loadData();
  }, [dispatch]);

  return (
    <PrivateRoute>
      <CardTitle className="text-center text-2xl font-bold">
        Experience Us
      </CardTitle>
      {isLoading && (
        <Loading
          divStyle="w-full flex items-center justify-center mt-4"
          spinerStyle="size-8"
        />
      )}
      {Error && <p>Error: {Error}</p>}
      {!isLoading && !Error && (
        <div>
          {experienceData.length === 0 && <ExperienceForm />}
          {experienceData.map((item) => (
           <ExperienceInfo  key={item._id} {...item}/>
          ))}
        </div>
      )}
    </PrivateRoute>
  );
};

export default ExperiencePage;
