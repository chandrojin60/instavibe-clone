import { Outlet } from "react-router-dom";
import BottomTabBar from "./BottomTabBar";
import SideNav from "./SideNav";
import TopHeader from "./TopHeader";

export default function InstagramLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <SideNav />
      <main className="pt-[44px] pb-[56px] md:pt-0 md:pb-0 md:pl-[72px] lg:pl-[244px]">
        <div className="mx-auto max-w-[630px]">
          <Outlet />
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
