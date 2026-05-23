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
import { Switch } from "@/components/ui/switch";
import { Plus, Loader2 } from "lucide-react";
import { he } from "@/locales/he";

const { listingForm: t, propertyTypeLabels, statusLabels } = he;

const PROPERTY_TYPES = ["apartment", "house", "villa", "penthouse", "commercial", "land", "building"];
const ROOM_OPTIONS = ["1", "2", "3", "4", "5", "6+"];

const initialForm = {
  title: "",
  description: "",
  price: "",
  property_type: "apartment",
  status: "for_sale",
  bedrooms: "",
  bathrooms: "",
  area_sqft: "",
  city: "",
  neighborhood: "",
  address: "",
  image_url: "",
  is_featured: false,
  total_apartments: "",
  apartment_breakdown: [],
};

export default function AddListingDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data) => api.listings.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["featured-listings"] });
      setOpen(false);
      setForm(initialForm);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    /** @type {any} */
    const data = {
      ...form,
      price: form.price ? Number(form.price) : undefined,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      area_sqft: form.area_sqft ? Number(form.area_sqft) : undefined,
    };
    createMutation.mutate(data);
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateBreakdown = (rooms, count) => {
    setForm((prev) => {
      const existing = prev.apartment_breakdown.filter((b) => b.rooms !== rooms);
      if (count === "" || count === "0") return { ...prev, apartment_breakdown: existing };
      return { ...prev, apartment_breakdown: [...existing, { rooms, count: Number(count) }] };
    });
  };

  const getBreakdownCount = (rooms) => {
    const entry = form.apartment_breakdown.find((b) => b.rooms === rooms);
    return entry ? String(entry.count) : "";
  };

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
            <Label>{t.descriptionLabel}</Label>
            <Textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="rounded-none mt-1 h-24"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t.priceLabel}</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                required
                className="rounded-none mt-1"
              />
            </div>
            <div>
              <Label>{t.propertyTypeLabel}</Label>
              <Select value={form.property_type} onValueChange={(v) => update("property_type", v)}>
                <SelectTrigger className="rounded-none mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {propertyTypeLabels[type] || type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {form.property_type !== "building" && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>{t.bedroomsLabel}</Label>
                <Input
                  type="number"
                  value={form.bedrooms}
                  onChange={(e) => update("bedrooms", e.target.value)}
                  className="rounded-none mt-1"
                />
              </div>
              <div>
                <Label>{t.bathroomsLabel}</Label>
                <Input
                  type="number"
                  value={form.bathrooms}
                  onChange={(e) => update("bathrooms", e.target.value)}
                  className="rounded-none mt-1"
                />
              </div>
              <div>
                <Label>{t.areaLabel}</Label>
                <Input
                  type="number"
                  value={form.area_sqft}
                  onChange={(e) => update("area_sqft", e.target.value)}
                  className="rounded-none mt-1"
                />
              </div>
            </div>
          )}
          {form.property_type === "building" && (
            <div className="border border-slate-200 p-4 space-y-4">
              <h3 className="text-sm font-semibold text-[#0A1628] uppercase tracking-wider">
                {t.buildingDetailsHeading}
              </h3>
              <div>
                <Label>{t.totalApartmentsLabel}</Label>
                <Input
                  type="number"
                  value={form.total_apartments}
                  onChange={(e) => update("total_apartments", e.target.value)}
                  placeholder={t.totalApartmentsPlaceholder}
                  className="rounded-none mt-1"
                />
              </div>
              <div>
                <Label className="mb-2 block">{t.breakdownLabel}</Label>
                <div className="grid grid-cols-3 gap-3">
                  {ROOM_OPTIONS.map((rooms) => (
                    <div key={rooms}>
                      <label className="text-xs text-slate-500 mb-1 block">
                        {rooms} {t.roomsSuffix}
                      </label>
                      <Input
                        type="number"
                        value={getBreakdownCount(rooms)}
                        onChange={(e) => updateBreakdown(rooms, e.target.value)}
                        placeholder="0"
                        className="rounded-none h-9 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t.cityLabel}</Label>
              <Input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="rounded-none mt-1"
              />
            </div>
            <div>
              <Label>{t.neighborhoodLabel}</Label>
              <Input
                value={form.neighborhood}
                onChange={(e) => update("neighborhood", e.target.value)}
                className="rounded-none mt-1"
              />
            </div>
          </div>
          <div>
            <Label>{t.statusLabel}</Label>
            <Select value={form.status} onValueChange={(v) => update("status", v)}>
              <SelectTrigger className="rounded-none mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="for_sale">{statusLabels.for_sale}</SelectItem>
                <SelectItem value="for_rent">{statusLabels.for_rent}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t.imageUrlLabel}</Label>
            <Input
              value={form.image_url}
              onChange={(e) => update("image_url", e.target.value)}
              placeholder="https://..."
              className="rounded-none mt-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={form.is_featured}
              onCheckedChange={(v) => update("is_featured", v)}
            />
            <Label>{t.featuredLabel}</Label>
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
