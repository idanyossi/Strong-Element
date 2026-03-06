import React from "react";
import { Bed, Bath, Maximize, MapPin, X } from "lucide-react";

export default function ListingModal({ listing, onClose }) {
  if (!listing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={listing.image_url || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
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
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[#C9A84C] font-bold text-2xl">
                ${listing.price?.toLocaleString()}
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#0A1628] leading-tight">
                {listing.title}
              </h2>
            </div>
            <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 font-medium capitalize whitespace-nowrap">
              {listing.property_type?.replace("_", " ")}
            </span>
          </div>

          {(listing.neighborhood || listing.city) && (
            <p className="mt-2 text-slate-400 text-sm flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {listing.neighborhood}
              {listing.city ? `, ${listing.city}` : ""}
            </p>
          )}

          {listing.address && (
            <p className="mt-1 text-slate-400 text-sm">{listing.address}</p>
          )}

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-6 text-slate-600 text-sm">
            {listing.bedrooms != null && (
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4" /> {listing.bedrooms} Bedrooms
              </span>
            )}
            {listing.bathrooms != null && (
              <span className="flex items-center gap-1.5">
                <Bath className="w-4 h-4" /> {listing.bathrooms} Bathrooms
              </span>
            )}
            {listing.area_sqft != null && (
              <span className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4" /> {listing.area_sqft} sqft
              </span>
            )}
          </div>

          {/* Description */}
          {listing.description && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-[#0A1628] uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
