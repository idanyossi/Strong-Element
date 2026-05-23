import React, { useState } from "react";
import { api } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { he } from "@/locales/he";

const { articleForm: t } = he;

const initialForm = {
  title: "",
  summary: "",
  content: "",
  cover_image_url: "",
  category: "market_insights",
  author_name: "",
  is_published: true,
};

export default function AddArticleDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data) => api.articles.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setOpen(false);
      setForm(initialForm);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(/** @type {any} */ (form));
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#C9A84C] hover:bg-[#D4B96A] text-[#0A1628] rounded-none h-11 font-semibold">
          <Plus className="ms-2 h-4 w-4" /> {t.addButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-[#0A1628] text-xl font-bold">
            {t.dialogTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <Label>{t.titleLabel}</Label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>{t.summaryLabel}</Label>
            <Textarea
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
              className="rounded-none mt-1 h-20"
              placeholder={t.summaryPlaceholder}
            />
          </div>
          <div>
            <Label>{t.contentLabel}</Label>
            <Textarea
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              required
              className="rounded-none mt-1 h-48 font-mono text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t.categoryLabel}</Label>
              <Select value={form.category} onValueChange={(v) => update("category", v)}>
                <SelectTrigger className="rounded-none mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {t.categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t.authorLabel}</Label>
              <Input
                value={form.author_name}
                onChange={(e) => update("author_name", e.target.value)}
                className="rounded-none mt-1"
              />
            </div>
          </div>
          <div>
            <Label>{t.imageUrlLabel}</Label>
            <Input
              value={form.cover_image_url}
              onChange={(e) => update("cover_image_url", e.target.value)}
              placeholder="https://..."
              className="rounded-none mt-1"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-none"
            >
              {t.cancelButton}
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-[#0A1628] hover:bg-[#1B2D4F] rounded-none"
            >
              {createMutation.isPending && <Loader2 className="ms-2 h-4 w-4 animate-spin" />}
              {t.submitButton}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
