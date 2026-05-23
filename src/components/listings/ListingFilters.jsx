import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

const PROPERTY_TYPES = [
  { value: "all", label: "כל הסוגים" },
  { value: "apartment", label: "דירה" },
  { value: "house", label: "בית" },
  { value: "villa", label: "וילה" },
  { value: "penthouse", label: "פנטהאוז" },
  { value: "commercial", label: "מסחרי" },
  { value: "land", label: "קרקע" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "כל הסטטוסים" },
  { value: "for_sale", label: "למכירה" },
  { value: "for_rent", label: "להשכרה" },
];

export default function ListingFilters({ filters, setFilters, isMobile }) {
  const suffix = isMobile ? "mobile" : "desktop";

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      property_type: "all",
      status: "all",
      min_price: "",
      max_price: "",
      bedrooms: "all",
      city: "",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.property_type !== "all" ||
    filters.status !== "all" ||
    filters.min_price ||
    filters.max_price ||
    filters.bedrooms !== "all" ||
    filters.city;

  const containerClass = isMobile
    ? "space-y-4 rounded-[24px] bg-white p-5"
    : "sticky top-28 space-y-6 rounded-[24px] bg-white p-6";

  return (
    <aside className={containerClass} aria-label={isMobile ? "סינון נכסים במובייל" : "סינון נכסים"}>
      {!isMobile && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#082b86]">
            סינון
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs font-extrabold text-[#082b86]"
              type="button"
            >
              <X className="w-3 h-3" aria-hidden="true" /> ניקוי
            </button>
          )}
        </div>
      )}

      {/* Search */}
      <div className={isMobile ? "" : ""}>
        <Label htmlFor={`search-${suffix}`} className="sr-only">
          חיפוש נכסים
        </Label>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <Input
            id={`search-${suffix}`}
            placeholder="חיפוש נכסים..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="h-12 rounded-full border-slate-200 pr-10"
          />
        </div>
      </div>

      <div className={isMobile ? "grid grid-cols-2 gap-3" : "space-y-5"}>
        {/* Property Type */}
        <div>
          <Label
            htmlFor={`property-type-${suffix}`}
            className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}
          >
            סוג נכס
          </Label>
          <Select
            value={filters.property_type}
            onValueChange={(v) => updateFilter("property_type", v)}
          >
            <SelectTrigger id={`property-type-${suffix}`} className="h-12 rounded-full border-slate-200">
              <SelectValue placeholder="סוג" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <Label
            htmlFor={`status-${suffix}`}
            className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}
          >
            סטטוס
          </Label>
          <Select
            value={filters.status}
            onValueChange={(v) => updateFilter("status", v)}
          >
            <SelectTrigger id={`status-${suffix}`} className="h-12 rounded-full border-slate-200">
              <SelectValue placeholder="סטטוס" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <Label
            htmlFor={`bedrooms-${suffix}`}
            className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}
          >
            חדרים
          </Label>
          <Select
            value={filters.bedrooms}
            onValueChange={(v) => updateFilter("bedrooms", v)}
          >
            <SelectTrigger id={`bedrooms-${suffix}`} className="h-12 rounded-full border-slate-200">
              <SelectValue placeholder="חדרים" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל מספר</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div>
          <Label
            htmlFor={`city-${suffix}`}
            className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}
          >
            עיר
          </Label>
          <Input
            id={`city-${suffix}`}
            placeholder="עיר"
            value={filters.city}
            onChange={(e) => updateFilter("city", e.target.value)}
            className="h-12 rounded-full border-slate-200"
          />
        </div>

        {/* Price Range */}
        <div className={isMobile ? "col-span-2" : ""}>
          <Label className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}>
            טווח מחיר
          </Label>
          <div className="flex gap-2">
            <Label htmlFor={`min-price-${suffix}`} className="sr-only">
              מחיר מינימלי
            </Label>
            <Input
              id={`min-price-${suffix}`}
              type="number"
              inputMode="numeric"
              placeholder="מינימום"
              value={filters.min_price}
              onChange={(e) => updateFilter("min_price", e.target.value)}
              className="h-12 rounded-full border-slate-200"
            />
            <Label htmlFor={`max-price-${suffix}`} className="sr-only">
              מחיר מקסימלי
            </Label>
            <Input
              id={`max-price-${suffix}`}
              type="number"
              inputMode="numeric"
              placeholder="מקסימום"
              value={filters.max_price}
              onChange={(e) => updateFilter("max_price", e.target.value)}
              className="h-12 rounded-full border-slate-200"
            />
          </div>
        </div>
      </div>

      {isMobile && hasActiveFilters && (
        <Button
          onClick={clearFilters}
          variant="ghost"
          className="w-full rounded-full text-xs font-extrabold text-[#082b86]"
        >
          <X className="ms-1 h-3 w-3" aria-hidden="true" /> ניקוי כל הסינונים
        </Button>
      )}
    </aside>
  );
}
