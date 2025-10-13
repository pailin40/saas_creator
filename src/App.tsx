import { useState } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { OverviewPage } from "./components/pages/OverviewPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { AudiencePage } from "./components/pages/AudiencePage";
import { ContentPage } from "./components/pages/ContentPage";
import { CalendarPage } from "./components/pages/CalendarPage";
import { SettingsPage } from "./components/pages/SettingsPage";

export default function App() {
  const [activePage, setActivePage] = useState("overview");

  const renderActivePage = () => {
    switch (activePage) {
      case "overview":
        return <OverviewPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "audience":
        return <AudiencePage />;
      case "content":
        return <ContentPage />;
      case "calendar":
        return <CalendarPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header spans FULL WIDTH across the top */}
      <DashboardHeader />

      {/* Sidebar + Content below header */}
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar activeItem={activePage} onNavigate={setActivePage} />

        <main className="flex-1 overflow-y-auto p-6">{renderActivePage()}</main>
      </div>
    </div>
  );
}
