import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { OverviewPage } from "./components/pages/OverviewPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { AudiencePage } from "./components/pages/AudiencePage";
import { ContentPage } from "./components/pages/ContentPage";
import { CalendarPage } from "./components/pages/CalendarPage";
import { SettingsPage } from "./components/pages/SettingsPage";

// Placeholder pages for platforms
function PlatformPlaceholder({ platform }: { platform: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{platform} Details</h1>
        <p className="text-2xl text-muted-foreground">Coming Soon</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-background">
        {/* Header spans FULL WIDTH across the top */}
        <DashboardHeader />

        {/* Sidebar + Content below header */}
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />

          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              {/* Main navigation pages */}
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/audience" element={<AudiencePage />} />
              <Route path="/content" element={<ContentPage />} />
              <Route path="/schedule" element={<CalendarPage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* Missing routes from sidebar */}
              <Route
                path="/goals"
                element={<PlatformPlaceholder platform="Goals" />}
              />
              <Route
                path="/growth"
                element={<PlatformPlaceholder platform="Growth" />}
              />

              {/* Platform detail pages */}
              <Route
                path="/instagram"
                element={<PlatformPlaceholder platform="Instagram" />}
              />
              <Route
                path="/youtube"
                element={<PlatformPlaceholder platform="YouTube" />}
              />
              <Route
                path="/tiktok"
                element={<PlatformPlaceholder platform="TikTok" />}
              />
              <Route
                path="/twitter"
                element={<PlatformPlaceholder platform="Twitter" />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
