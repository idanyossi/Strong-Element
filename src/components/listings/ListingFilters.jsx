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
import { he } from "@/locales/he";

const { listingFilters: t, propertyTypeLabels, statusLabels } = he;

const PROPERTY_TYPES = [
  { value: "all", label: t.allTypes },
  { value: "apartment", label: propertyTypeLabels.apartment },
  { value: "house", label: propertyTypeLabels.house },
  { value: "villa", label: propertyTypeLabels.villa },
  { value: "penthouse", label: propertyTypeLabels.penthouse },
  { value: "commercial", label: propertyTypeLabels.commercial },
  { value: "land", label: propertyTypeLabels.land },
];

const STATUS_OPTIONS = [
  { value: "all", label: t.allStatuses },
  { value: "for_sale", label: statusLabels.for_sale },
  { value: "for_rent", label: statusLabels.for_rent },
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
    <aside className={containerClass} aria-label={isMobile ? t.mobileAria : t.desktopAria}>
      {!isMobile && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#082b86]">{t.heading}</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs font-extrabold text-[#082b86]"
              type="button"
            >
              <X className="w-3 h-3" aria-hidden="true" /> {t.clear}
            </button>
          )}
        </div>
      )}

      <div>
        <Label htmlFor={`search-${suffix}`} className="sr-only">
          {t.searchLabel}
        </Label>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <Input
            id={`search-${suffix}`}
            placeholder={t.searchPlaceholder}
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="h-12 rounded-full border-slate-200 pr-10"
          />
        </div>
      </div>

      <div className={isMobile ? "grid grid-cols-2 gap-3" : "space-y-5"}>
        <div>
          <Label
            htmlFor={`property-type-${suffix}`}
            className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}
          >
            {t.typeLabel}
          </Label>
          <Select
            value={filters.property_type}
            onValueChange={(v) => updateFilter("property_type", v)}
          >
            <SelectTrigger id={`property-type-${suffix}`} className="h-12 rounded-full border-slate-200">
              <SelectValue placeholder={t.typePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor={`status-${suffix}`}
            className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}
          >
            {t.statusLabel}
          </Label>
          <Select
            value={filters.status}
            onValueChange={(v) => updateFilter("status", v)}
          >
            <SelectTrigger id={`status-${suffix}`} className="h-12 rounded-full border-slate-200">
              <SelectValue placeholder={t.statusPlaceholder} />
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

        <div>
          <Label
            htmlFor={`bedrooms-${suffix}`}
            className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}
          >
            {t.bedroomsLabel}
          </Label>
          <Select
            value={filters.bedrooms}
            onValueChange={(v) => updateFilter("bedrooms", v)}
          >
            <SelectTrigger id={`bedrooms-${suffix}`} className="h-12 rounded-full border-slate-200">
              <SelectValue placeholder={t.bedroomsPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allBedrooms}</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor={`city-${suffix}`}
            className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}
          >
            {t.cityLabel}
          </Label>
          <Input
            id={`city-${suffix}`}
            placeholder={t.cityPlaceholder}
            value={filters.city}
            onChange={(e) => updateFilter("city", e.target.value)}
            className="h-12 rounded-full border-slate-200"
          />
        </div>

        <div className={isMobile ? "col-span-2" : ""}>
          <Label className={isMobile ? "sr-only" : "mb-2 block text-xs font-black text-slate-500"}>
            {t.priceRangeLabel}
          </Label>
          <div className="flex gap-2">
            <Label htmlFor={`min-price-${suffix}`} className="sr-only">
              {t.minPriceLabel}
            </Label>
            <Input
              id={`min-price-${suffix}`}
              type="number"
              inputMode="numeric"
              placeholder={t.minPricePlaceholder}
              value={filters.min_price}
              onChange={(e) => updateFilter("min_price", e.target.value)}
              className="h-12 rounded-full border-slate-200"
            />
            <Label htmlFor={`max-price-${suffix}`} className="sr-only">
              {t.maxPriceLabel}
            </Label>
            <Input
              id={`max-price-${suffix}`}
              type="number"
              inputMode="numeric"
              placeholder={t.maxPricePlaceholder}
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
          <X className="ms-1 h-3 w-3" aria-hidden="true" /> {t.clearAll}
        </Button>
      )}
    </aside>
  );
}
