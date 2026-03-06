import React from "react";
import { Bed, Bath, Maximize, MapPin, Trash2 } from "lucide-react";

export default function ListingCard({ listing, isAdmin, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${listing.title}"?`)) onDelete(listing.id);
  };

  return (
    <div className="bg-white shadow-sm hover:shadow-lg transition-shadow group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={
            listing.image_url ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
          }
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#0A1628]/90 text-white text-[10px] font-semibold px-3 py-1 tracking-wider uppercase">
            {listing.status?.replace("_", " ") || "For Sale"}
          </span>
          {listing.is_featured && (
            <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-semibold px-3 py-1 tracking-wider uppercase">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="w-7 h-7 bg-red-600/90 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
              title="Delete listing"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-[#0A1628] text-xs font-medium px-3 py-1 capitalize">
            {listing.property_type?.replace("_", " ")}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[#C9A84C] font-bold text-xl">
          ${listing.price?.toLocaleString()}
        </p>
        <h3 className="mt-1.5 font-semibold text-[#0A1628] leading-tight line-clamp-1">
          {listing.title}
        </h3>
        {(listing.neighborhood || listing.city) && (
          <p className="mt-1.5 text-slate-400 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {listing.neighborhood}
            {listing.city ? `, ${listing.city}` : ""}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 text-slate-500 text-xs">
          {listing.bedrooms != null && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" /> {listing.bedrooms} Beds
            </span>
          )}
          {listing.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" /> {listing.bathrooms} Baths
            </span>
          )}
          {listing.area_sqft != null && (
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" /> {listing.area_sqft} sqft
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
