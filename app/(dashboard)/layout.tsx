"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar/app-sidebar";
import {  useDispatch } from "react-redux";
import { getUserData } from "@/lib/user/operation";
import { useEffect } from "react";
import { AppDispatch } from "@/lib/store";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const userData = () => {
      dispatch(getUserData());
    };
    userData();
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-3">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
