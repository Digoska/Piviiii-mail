"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { EmailList } from "@/components/EmailList";
import { EmailThread } from "@/components/EmailThread";
import { ComposeModal } from "@/components/ComposeModal";
import { createClient } from "@/lib/supabase/client";
import type { Profile, EmailWithProfiles } from "@/types/database";

export function MailClient() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState("Inbox");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [emails, setEmails] = useState<EmailWithProfiles[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailWithProfiles | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user profile
  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data as Profile);
    }
    getProfile();
  }, [supabase, router]);

  // Fetch emails
  const fetchEmails = useCallback(async () => {
    if (!profile) return;
    setLoading(true);

    let query = supabase
      .from("emails")
      .select("*, sender:profiles!emails_from_id_fkey(*), recipient:profiles!emails_to_id_fkey(*)")
      .eq("archived", false)
      .eq("is_draft", false)
      .order("created_at", { ascending: false });

    if (activeFolder === "Inbox") {
      query = query.eq("to_id", profile.id);
    } else if (activeFolder === "Sent") {
      query = query.eq("from_id", profile.id).neq("to_id", profile.id);
    } else if (activeFolder === "Drafts") {
      query = supabase
        .from("emails")
        .select("*, sender:profiles!emails_from_id_fkey(*), recipient:profiles!emails_to_id_fkey(*)")
        .eq("from_id", profile.id)
        .eq("is_draft", true)
        .order("created_at", { ascending: false });
    }

    const { data } = await query;

    if (data) {
      const mapped = (data as Record<string, unknown>[]).map((row) => ({
        ...row,
        sender: Array.isArray(row.sender) ? row.sender[0] : row.sender,
        recipient: Array.isArray(row.recipient) ? row.recipient[0] : row.recipient,
      })) as EmailWithProfiles[];
      setEmails(mapped);
    }

    setLoading(false);
  }, [supabase, profile, activeFolder]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  // Realtime subscription
  useEffect(() => {
    if (!profile) return;

    const channel = supabase
      .channel("emails-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "emails" },
        () => fetchEmails()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, profile, fetchEmails]);

  // Select & mark read
  async function handleSelectEmail(email: EmailWithProfiles) {
    setSelectedEmail(email);
    if (!email.is_read && email.to_id === profile?.id) {
      await supabase.from("emails").update({ is_read: true }).eq("id", email.id);
      setEmails((prev) =>
        prev.map((e) => (e.id === email.id ? { ...e, is_read: true } : e))
      );
    }
  }

  // Toggle star
  async function handleToggleStar(emailId: string) {
    const email = emails.find((e) => e.id === emailId);
    if (!email) return;
    const newVal = !email.is_starred;
    await supabase.from("emails").update({ is_starred: newVal }).eq("id", emailId);
    setEmails((prev) =>
      prev.map((e) => (e.id === emailId ? { ...e, is_starred: newVal } : e))
    );
    if (selectedEmail?.id === emailId) {
      setSelectedEmail((prev) => prev ? { ...prev, is_starred: newVal } : null);
    }
  }

  // Archive
  async function handleArchive(emailId: string) {
    await supabase.from("emails").update({ archived: true }).eq("id", emailId);
    setEmails((prev) => prev.filter((e) => e.id !== emailId));
    if (selectedEmail?.id === emailId) setSelectedEmail(null);
  }

  // Sign out
  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const unreadCount = emails.filter(
    (e) => !e.is_read && e.to_id === profile?.id
  ).length;

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCompose={() => setComposeOpen(true)}
        activeFolder={activeFolder}
        onFolderChange={setActiveFolder}
        folderCounts={{ Inbox: unreadCount, Sent: 0, Drafts: 0, Shared: 0 }}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header profile={profile} onSignOut={handleSignOut} />

        <div className="flex flex-1 overflow-hidden">
          <div className="w-[380px] shrink-0 border-r border-border overflow-hidden">
            <EmailList
              emails={emails}
              selectedId={selectedEmail?.id ?? null}
              onSelect={handleSelectEmail}
              currentUserId={profile.id}
              activeFolder={activeFolder}
              loading={loading}
            />
          </div>

          <div className="flex-1 overflow-hidden">
            {selectedEmail ? (
              <EmailThread
                email={selectedEmail}
                currentUserId={profile.id}
                onToggleStar={handleToggleStar}
                onArchive={handleArchive}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <p className="font-serif text-lg italic text-foreground/20">
                  {loading ? "Loading..." : emails.length === 0 ? "No emails yet" : "Select an email"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        currentProfile={profile}
        onSent={fetchEmails}
      />
    </div>
  );
}
