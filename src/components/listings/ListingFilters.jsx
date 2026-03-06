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
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "for_sale", label: "For Sale" },
  { value: "for_rent", label: "For Rent" },
];

export default function ListingFilters({ filters, setFilters, isMobile }) {
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
    ? "bg-white border-b border-slate-200 p-4 space-y-4"
    : "bg-white p-6 shadow-sm space-y-6 sticky top-24";

  return (
    <div className={containerClass}>
      {!isMobile && (
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[#0A1628] text-sm tracking-[0.1em] uppercase">
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#C9A84C] hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      )}

      {/* Search */}
      <div className={isMobile ? "" : ""}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search properties..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 rounded-none border-slate-200 h-11"
          />
        </div>
      </div>

      <div className={isMobile ? "grid grid-cols-2 gap-3" : "space-y-5"}>
        {/* Property Type */}
        <div>
          {!isMobile && (
            <Label className="text-xs text-slate-500 mb-2 block">
              Property Type
            </Label>
          )}
          <Select
            value={filters.property_type}
            onValueChange={(v) => updateFilter("property_type", v)}
          >
            <SelectTrigger className="rounded-none h-11 border-slate-200">
              <SelectValue placeholder="Type" />
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
          {!isMobile && (
            <Label className="text-xs text-slate-500 mb-2 block">Status</Label>
          )}
          <Select
            value={filters.status}
            onValueChange={(v) => updateFilter("status", v)}
          >
            <SelectTrigger className="rounded-none h-11 border-slate-200">
              <SelectValue placeholder="Status" />
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
          {!isMobile && (
            <Label className="text-xs text-slate-500 mb-2 block">
              Bedrooms
            </Label>
          )}
          <Select
            value={filters.bedrooms}
            onValueChange={(v) => updateFilter("bedrooms", v)}
          >
            <SelectTrigger className="rounded-none h-11 border-slate-200">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
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
          {!isMobile && (
            <Label className="text-xs text-slate-500 mb-2 block">City</Label>
          )}
          <Input
            placeholder="City"
            value={filters.city}
            onChange={(e) => updateFilter("city", e.target.value)}
            className="rounded-none h-11 border-slate-200"
          />
        </div>

        {/* Price Range */}
        <div className={isMobile ? "col-span-2" : ""}>
          {!isMobile && (
            <Label className="text-xs text-slate-500 mb-2 block">
              Price Range
            </Label>
          )}
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.min_price}
              onChange={(e) => updateFilter("min_price", e.target.value)}
              className="rounded-none h-11 border-slate-200"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.max_price}
              onChange={(e) => updateFilter("max_price", e.target.value)}
              className="rounded-none h-11 border-slate-200"
            />
          </div>
        </div>
      </div>

      {isMobile && hasActiveFilters && (
        <Button
          onClick={clearFilters}
          variant="ghost"
          className="text-xs text-[#C9A84C] w-full rounded-none"
        >
          <X className="w-3 h-3 mr-1" /> Clear All Filters
        </Button>
      )}
    </div>
  );
}
