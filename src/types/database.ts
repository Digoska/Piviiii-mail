export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string;
          created_at?: string;
        };
      };
      emails: {
        Row: {
          id: string;
          from_id: string;
          to_id: string;
          subject: string;
          body: string;
          is_read: boolean;
          is_starred: boolean;
          is_draft: boolean;
          archived: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          from_id: string;
          to_id: string;
          subject: string;
          body: string;
          is_read?: boolean;
          is_starred?: boolean;
          is_draft?: boolean;
          archived?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          from_id?: string;
          to_id?: string;
          subject?: string;
          body?: string;
          is_read?: boolean;
          is_starred?: boolean;
          is_draft?: boolean;
          archived?: boolean;
          created_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type EmailRow = Database["public"]["Tables"]["emails"]["Row"];

export interface EmailWithProfiles extends EmailRow {
  sender: Profile;
  recipient: Profile;
}
