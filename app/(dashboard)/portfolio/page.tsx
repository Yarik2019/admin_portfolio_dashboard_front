"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioData } from "@/lib/portfolio/operations";
import {
  selectPortfolioItems,
  selectPortfolioLoading,
  selectPortfolioError,
} from "@/lib/portfolio/selectors";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import type { AppDispatch } from "@/lib/store";
import Loading from "@/components/Loading/Loading";
import PortfolioForm from "@/components/Portfolio/PortfolioForm";
import PortfolioInfo from "@/components/Portfolio/PortfolioInfo";
import { CardTitle } from "@/components/ui/card";

interface PortfolioCard {
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

interface PortfolioPageProps {
  _id: string;
  title: string;
  description: string;
  cards: PortfolioCard[];
}

const PortfolioPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const portfolioItems = useSelector(
    selectPortfolioItems,
  ) as PortfolioPageProps[];
  const isLoading = useSelector(selectPortfolioLoading);
  const Error = useSelector(selectPortfolioError);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getPortfolioData());
    };
    loadData();
  }, [dispatch]);

  return (
    <PrivateRoute>
      <CardTitle className="text-center text-2xl font-bold">
        Portfolio Us
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
          {portfolioItems.length === 0 && <PortfolioForm />}
          {portfolioItems.map((item) => (
            <PortfolioInfo key={item._id} {...item} />
          ))}
        </div>
      )}
    </PrivateRoute>
  );
};

export default PortfolioPage;
