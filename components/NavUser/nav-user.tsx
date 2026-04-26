"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import type { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { logOut } from "@/lib/user/operation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserLoading } from "@/lib/user/selectors";
import Loading from "@/components/Loading/Loading";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    // avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleLogOut = () => {
    dispatch(logOut()).unwrap();
    router.push("/signin");
  };

  const isLoading = useSelector(selectUserLoading);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
             {isLoading && <Loading divStyle="" spinerStyle="size-4" />}
             {!isLoading && (
               <>
                 <Avatar className="h-8 w-8 rounded-lg grayscale">
                   {/* <AvatarImage src={user?.avatar} alt={user?.name} /> */}
                   <AvatarFallback className="rounded-lg">
                     {user?.name?.charAt(0)}
                   </AvatarFallback>
                 </Avatar>
                 <div className="grid flex-1 text-left text-sm leading-tight">
                   <span className="truncate font-medium">{user?.name}</span>
                   <span className="truncate text-xs text-muted-foreground">
                     {user?.email}
                   </span>
                 </div>
               </>
             )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              {isLoading && <Loading divStyle="" spinerStyle="size-4" />}
              {!isLoading && (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={user?.avatar} alt={user?.name} /> */}
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
