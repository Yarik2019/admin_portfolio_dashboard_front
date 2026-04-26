"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar/app-sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "@/lib/user/operation";
import { selectUser } from "@/lib/user/selectors";
import { useEffect } from "react";
import { AppDispatch } from "@/lib/store";
import { User } from "@/lib/user/slice";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const user = useSelector(selectUser) as User;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const userData = () => {
      dispatch(getUserData());
    };
    userData();
  }, [dispatch]);

  if (!user) return null;
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-3">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
