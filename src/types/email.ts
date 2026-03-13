export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  to: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  labels: string[];
}

export interface SidebarItem {
  icon: string;
  label: string;
  count?: number;
  active?: boolean;
}
