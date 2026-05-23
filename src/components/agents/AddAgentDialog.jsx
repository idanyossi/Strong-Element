import React, { useState } from 'react';
import { api } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Loader2 } from 'lucide-react';
import { he } from '@/locales/he';

const { agentForm: t } = he;

const initialForm = {
  name: '',
  title: '',
  bio: '',
  photo_url: '',
  email: '',
  phone: '',
  linkedin_url: '',
  years_experience: '',
  specializations: '',
};

export default function AddAgentDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data) => api.agents.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      setOpen(false);
      setForm(initialForm);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    /** @type {any} */
    const data = {
      ...form,
      years_experience: form.years_experience ? Number(form.years_experience) : undefined,
      specializations: form.specializations
        ? form.specializations.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    };
    createMutation.mutate(data);
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#C9A84C] hover:bg-[#D4B96A] text-[#0A1628] rounded-none h-11 font-semibold">
          <Plus className="ms-2 h-4 w-4" /> {t.addButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-[#0A1628] text-xl font-bold">{t.dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>{t.nameLabel}</Label>
            <Input
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>{t.titleLabel}</Label>
            <Input
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder={t.titlePlaceholder}
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>{t.bioLabel}</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              className="rounded-none mt-1 h-24"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t.emailLabel}</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="rounded-none mt-1"
              />
            </div>
            <div>
              <Label>{t.phoneLabel}</Label>
              <Input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="rounded-none mt-1"
              />
            </div>
          </div>
          <div>
            <Label>{t.imageUrlLabel}</Label>
            <Input
              value={form.photo_url}
              onChange={(e) => update('photo_url', e.target.value)}
              placeholder="https://..."
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>{t.linkedinLabel}</Label>
            <Input
              value={form.linkedin_url}
              onChange={(e) => update('linkedin_url', e.target.value)}
              placeholder={t.linkedinPlaceholder}
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>{t.experienceLabel}</Label>
            <Input
              type="number"
              value={form.years_experience}
              onChange={(e) => update('years_experience', e.target.value)}
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>{t.specializationsLabel}</Label>
            <Input
              value={form.specializations}
              onChange={(e) => update('specializations', e.target.value)}
              placeholder={t.specializationsPlaceholder}
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
