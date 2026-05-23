import React from "react";
import { Bed, Bath, Maximize, MapPin, Trash2 } from "lucide-react";
import { he } from "@/locales/he";

const { listingCard: t, propertyTypeLabels, statusLabels } = he;

export default function ListingCard({ listing, isAdmin, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(t.deleteConfirm(listing.title))) onDelete(listing.id);
  };

  return (
    <div className="group overflow-hidden rounded-[7px] bg-white">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[7px] bg-slate-200">
        <img
          src={
            listing.image_url ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
          }
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex gap-2">
          <span className="bg-[#0A1628]/90 text-white text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
            {statusLabels[listing.status] ||
              listing.status?.replace("_", " ") ||
              t.forSale}
          </span>
          {listing.is_featured && (
            <span className="bg-white/90 text-[#0A1628] text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
              {t.featured}
            </span>
          )}
        </div>
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/90 text-white transition-colors hover:bg-red-700"
              type="button"
              aria-label={t.deleteAria(listing.title)}
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
          <span className="bg-white/90 text-[#0A1628] text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
            {propertyTypeLabels[listing.property_type] ||
              listing.property_type?.replace("_", " ")}
          </span>
        </div>
      </div>
      <div className="px-4 py-5">
        <p className="text-2xl font-bold tracking-[-0.04em] text-[#082b86]">
          ${listing.price?.toLocaleString()}
        </p>
        <h3 className="mt-1.5 line-clamp-1 text-xl font-bold tracking-[-0.035em] text-[#111]">
          {listing.title}
        </h3>
        {(listing.neighborhood || listing.city) && (
          <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-slate-500">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            {listing.neighborhood}
            {listing.city ? `, ${listing.city}` : ""}
          </p>
        )}
        <div className="mt-4 flex items-center gap-4 text-xs font-bold text-slate-600">
          {listing.bedrooms != null && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" aria-hidden="true" />{" "}
              {listing.bedrooms} {t.bedroomsSuffix}
            </span>
          )}
          {listing.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" aria-hidden="true" />{" "}
              {listing.bathrooms} {t.bathroomsSuffix}
            </span>
          )}
          {listing.area_sqft != null && (
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" aria-hidden="true" />{" "}
              {listing.area_sqft} {t.sqm}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
