"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/types";
import { Plus, Trash2, Loader2, Upload, ExternalLink } from "lucide-react";

interface PortfolioEditorProps {
  items: PortfolioItem[];
  userId: string;
  onUpdate: () => void;
}

export function PortfolioEditor({
  items: initialItems,
  userId,
  onUpdate,
}: PortfolioEditorProps) {
  const supabase = createClient();
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [showAdd, setShowAdd] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    external_url: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function addItem() {
    if (!newItem.title.trim() || !selectedFile) return;
    setUploading(true);

    try {
      const compressed = await compressImage(selectedFile);
      const fileName = `${userId}/${Date.now()}.webp`;
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(fileName, compressed, { contentType: "image/webp" });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(fileName);

      const { data, error } = await supabase
        .from("portfolio_items")
        .insert({
          user_id: userId,
          title: newItem.title,
          description: newItem.description || null,
          image_url: publicUrl,
          external_url: newItem.external_url || null,
          sort_order: items.length,
        })
        .select()
        .single();

      if (!error && data) {
        setItems([...items, data]);
        setNewItem({ title: "", description: "", external_url: "" });
        setSelectedFile(null);
        setPreview(null);
        setShowAdd(false);
        onUpdate();
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  async function deleteItem(id: string) {
    const { error } = await supabase
      .from("portfolio_items")
      .delete()
      .eq("id", id);
    if (!error) {
      setItems(items.filter((i) => i.id !== id));
      onUpdate();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Portfolio</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="kikaru-btn-secondary text-xs px-3 py-1.5"
        >
          <Plus className="w-3 h-3" />
          Add Item
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="p-4 bg-[#0A0A0A] border border-[#262626] rounded-lg space-y-3">
          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-[#262626] rounded-lg p-6 text-center hover:border-[#8B5CF6]/50 transition-colors">
              {preview ? (
                <div className="relative w-full h-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              ) : (
                <div className="text-[#A1A1AA]">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Click to upload an image</p>
                  <p className="text-xs mt-1">JPG, PNG, or WebP. Will be compressed.</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            placeholder="Title"
            className="kikaru-input text-sm"
          />
          <textarea
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            placeholder="Description (optional)"
            className="kikaru-input text-sm min-h-[60px] resize-none"
          />
          <input
            type="url"
            value={newItem.external_url}
            onChange={(e) =>
              setNewItem({ ...newItem, external_url: e.target.value })
            }
            placeholder="External link (optional)"
            className="kikaru-input text-sm"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setShowAdd(false);
                setPreview(null);
                setSelectedFile(null);
              }}
              className="kikaru-btn-secondary text-xs px-3 py-1.5"
            >
              Cancel
            </button>
            <button
              onClick={addItem}
              disabled={uploading || !newItem.title.trim() || !selectedFile}
              className="kikaru-btn-primary text-xs px-3 py-1.5 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Add to Portfolio"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#0A0A0A] border border-[#262626] rounded-lg overflow-hidden hover:border-[#8B5CF6]/30 transition-colors"
          >
            <div className="relative aspect-square">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {item.external_url && (
                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Open external link"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                )}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 bg-white/10 rounded-full hover:bg-red-500/50 transition-colors"
                  aria-label="Delete portfolio item"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate">{item.title}</p>
              {item.description && (
                <p className="text-xs text-[#A1A1AA] mt-0.5 truncate">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && !showAdd && (
        <div className="text-center py-8 text-[#A1A1AA]">
          <Image
            src=""
            alt=""
            width={0}
            height={0}
            className="hidden"
            aria-hidden
          />
          <p className="text-sm">No portfolio items yet.</p>
          <p className="text-xs mt-1">Click &quot;Add Item&quot; to showcase your work.</p>
        </div>
      )}
    </div>
  );
}
