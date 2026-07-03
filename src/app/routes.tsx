import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Mentorship from "./pages/Mentorship";
import Articles from "./pages/Articles";
import Marketplace from "./pages/Marketplace";
import Schemes from "./pages/Schemes";
import Finance from "./pages/Finance";
import LeadsCRM from "./pages/LeadsCRM";
import AIAssistant from "./pages/AIAssistant";
import AISearch from "./pages/AISearch";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import ContentHub from "./pages/ContentHub";
import Gallery from "./pages/Gallery";
import DocAssistant from "./pages/DocAssistant";
import SmartDashboard from "./pages/SmartDashboard";
import DashboardMentor from "./pages/DashboardMentor";
import DashboardMentee from "./pages/DashboardMentee";
import DashboardAdmin from "./pages/DashboardAdmin";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "register", Component: Register },
      { path: "mentorship", Component: Mentorship },
      { path: "articles", Component: Articles },
      { path: "services", Component: Marketplace },
      { path: "schemes", Component: Schemes },
      { path: "finance", Component: Finance },
      { path: "leads-crm", Component: LeadsCRM },
      { path: "ai-assistant", Component: AIAssistant },
      { path: "ai-search", Component: AISearch },
      { path: "knowledge-center", Component: KnowledgeCenter },
      { path: "content-hub", Component: ContentHub },
      { path: "gallery", Component: Gallery },
      { path: "doc-assistant", Component: DocAssistant },
      { path: "smart-dashboard", Component: SmartDashboard },
      { path: "demo", element: <Navigate to="/dashboard/mentor" replace /> },
      { path: "dashboard/mentor", Component: DashboardMentor },
      { path: "dashboard/mentee", Component: DashboardMentee },
      { path: "dashboard/admin", Component: DashboardAdmin },
      { path: "*", Component: NotFound },
    ],
  },
]);
