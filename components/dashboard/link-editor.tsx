"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Link } from "@/lib/types";
import {
  GripVertical,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";

interface LinkEditorProps {
  links: Link[];
  userId: string;
  onUpdate: () => void;
}

export function LinkEditor({ links: initialLinks, userId, onUpdate }: LinkEditorProps) {
  const supabase = createClient();
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [saving, setSaving] = useState(false);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [adding, setAdding] = useState(false);

  async function addLink() {
    if (!newLink.title.trim() || !newLink.url.trim()) return;
    setAdding(true);
    const { data, error } = await supabase
      .from("links")
      .insert({
        user_id: userId,
        title: newLink.title,
        url: newLink.url,
        sort_order: links.length,
      })
      .select()
      .single();

    if (!error && data) {
      setLinks([...links, data]);
      setNewLink({ title: "", url: "" });
      onUpdate();
    }
    setAdding(false);
  }

  async function deleteLink(id: string) {
    const { error } = await supabase.from("links").delete().eq("id", id);
    if (!error) {
      setLinks(links.filter((l) => l.id !== id));
      onUpdate();
    }
  }

  async function toggleLink(id: string, isActive: boolean) {
    const { error } = await supabase
      .from("links")
      .update({ is_active: !isActive })
      .eq("id", id);
    if (!error) {
      setLinks(links.map((l) => (l.id === id ? { ...l, is_active: !isActive } : l)));
    }
  }

  async function updateLink(id: string, field: "title" | "url", value: string) {
    setLinks(links.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }

  async function saveAll() {
    setSaving(true);
    for (const link of links) {
      await supabase
        .from("links")
        .update({ title: link.title, url: link.url, sort_order: link.sort_order })
        .eq("id", link.id);
    }
    setSaving(false);
    onUpdate();
  }

  function moveLink(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === links.length - 1)
    )
      return;
    const newLinks = [...links];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]];
    newLinks.forEach((l, i) => (l.sort_order = i));
    setLinks(newLinks);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Links</h3>
        <button
          onClick={saveAll}
          disabled={saving}
          className="kikaru-btn-secondary text-xs px-3 py-1.5"
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          Save Order
        </button>
      </div>

      {/* Existing Links */}
      <div className="space-y-2">
        {links.map((link, i) => (
          <div
            key={link.id}
            className={`flex items-center gap-3 p-3 bg-[#0A0A0A] border border-[#262626] rounded-lg group ${
              !link.is_active ? "opacity-50" : ""
            }`}
          >
            <button
              className="text-[#A1A1AA] hover:text-white cursor-grab"
              onDoubleClick={() => moveLink(i, "up")}
              aria-label="Reorder link"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                type="text"
                value={link.title}
                onChange={(e) => updateLink(link.id, "title", e.target.value)}
                className="bg-transparent border-none text-sm focus:outline-none text-white"
                placeholder="Link title"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(link.id, "url", e.target.value)}
                className="bg-transparent border-none text-sm focus:outline-none text-[#A1A1AA]"
                placeholder="https://..."
              />
            </div>
            <button
              onClick={() => toggleLink(link.id, link.is_active)}
              className="text-[#A1A1AA] hover:text-white transition-colors"
              aria-label={link.is_active ? "Hide link" : "Show link"}
            >
              {link.is_active ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => deleteLink(link.id)}
              className="text-[#A1A1AA] hover:text-red-400 transition-colors"
              aria-label="Delete link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Link */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <input
            type="text"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="Link title"
            className="kikaru-input text-sm"
          />
        </div>
        <div className="flex-1">
          <input
            type="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="https://..."
            className="kikaru-input text-sm"
          />
        </div>
        <button
          onClick={addLink}
          disabled={adding || !newLink.title.trim() || !newLink.url.trim()}
          className="kikaru-btn-primary px-3 py-2.5 disabled:opacity-50"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
