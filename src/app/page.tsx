"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { EmailList } from "@/components/EmailList";
import { EmailThread } from "@/components/EmailThread";
import { ComposeModal } from "@/components/ComposeModal";
import { mockEmails } from "@/data/mockEmails";
import type { Email } from "@/types/email";

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email>(mockEmails[0]);
  const [composeOpen, setComposeOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCompose={() => setComposeOpen(true)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* 2-Pane Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Pane — Email List */}
          <div className="w-[380px] shrink-0 border-r border-border overflow-hidden">
            <EmailList
              emails={mockEmails}
              selectedId={selectedEmail?.id ?? null}
              onSelect={setSelectedEmail}
            />
          </div>

          {/* Right Pane — Email Thread */}
          <div className="flex-1 overflow-hidden">
            {selectedEmail ? (
              <EmailThread email={selectedEmail} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Select an email to read
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />
    </div>
  );
}
