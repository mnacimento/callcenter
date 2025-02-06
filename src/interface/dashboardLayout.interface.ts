export interface DashboardLayoutProps {
    children: React.ReactNode;
    appName: string;
    username: string;
    onLogout: () => void;
  }