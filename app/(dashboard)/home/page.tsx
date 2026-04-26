"use client";

import { getHomeData } from "@/lib/home/operations";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHomeItems,
  selectHomeLoading,
  selectHomeError,
} from "@/lib/home/selectors";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import HomeInfo from "@/components/Home/HomeInfo";
import HomeForm from "@/components/Home/HomeForm";
import { CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading/Loading";
import { AppDispatch } from "@/lib/store";
interface HomePageProps {
  _id: string;
  title: string;
  description: string;
  link: string;
  image: { url: string } | null;
}
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const homeData = useSelector(selectHomeItems) as HomePageProps[];
  const isLoading = useSelector(selectHomeLoading);
  const Error = useSelector(selectHomeError);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getHomeData());
    };
    loadData();
  }, [dispatch]);

  console.log(homeData);

  return (
    <PrivateRoute>
      <CardTitle className="text-center text-2xl font-bold">Welcome to the Home Page</CardTitle>
      {isLoading && (
        <Loading
          divStyle="w-full flex items-center justify-center mt-4"
          spinerStyle="size-8"
        />
      )}
      {Error && <p>Error: {Error}</p>}
      {!isLoading && !Error && (
        <div>
          {homeData.map((item) => (
            <HomeInfo key={item._id} {...item} />
          ))}

          {homeData.length === 0 && <HomeForm />}
        </div>
      )}
    </PrivateRoute>
  );
};

export default Home;
