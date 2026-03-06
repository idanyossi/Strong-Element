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
import { Plus, Loader2, X } from 'lucide-react';

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
          <Plus className="w-4 h-4 mr-2" /> Add Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-[#0A1628] text-xl font-bold">New Agent</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>Full Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>Title / Role</Label>
            <Input
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. Senior Property Consultant"
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>Bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              className="rounded-none mt-1 h-24"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="rounded-none mt-1"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="rounded-none mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Photo URL</Label>
            <Input
              value={form.photo_url}
              onChange={(e) => update('photo_url', e.target.value)}
              placeholder="https://..."
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>LinkedIn URL</Label>
            <Input
              value={form.linkedin_url}
              onChange={(e) => update('linkedin_url', e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>Years of Experience</Label>
            <Input
              type="number"
              value={form.years_experience}
              onChange={(e) => update('years_experience', e.target.value)}
              className="rounded-none mt-1"
            />
          </div>
          <div>
            <Label>Specializations (comma-separated)</Label>
            <Input
              value={form.specializations}
              onChange={(e) => update('specializations', e.target.value)}
              placeholder="Luxury Homes, Commercial, Investments"
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
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-[#0A1628] hover:bg-[#1B2D4F] rounded-none"
            >
              {createMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Add Agent
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
