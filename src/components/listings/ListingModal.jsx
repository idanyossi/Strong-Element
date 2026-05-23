import React, { useEffect, useRef } from "react";
import { Bed, Bath, Maximize, MapPin, X } from "lucide-react";

const STATUS_LABELS = {
  for_sale: "למכירה",
  for_rent: "להשכרה",
};

const TYPE_LABELS = {
  apartment: "דירה",
  house: "בית",
  villa: "וילה",
  penthouse: "פנטהאוז",
  commercial: "מסחרי",
  land: "קרקע",
  building: "בניין",
};

export default function ListingModal({ listing, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!listing) return undefined;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [listing, onClose]);

  if (!listing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="listing-dialog-title"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={listing.image_url || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center bg-black/50 text-white transition-colors hover:bg-black/70"
            type="button"
            aria-label="סגירת פרטי הנכס"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="absolute right-3 top-3 flex gap-2">
            <span className="bg-[#0A1628]/90 text-white text-[10px] font-semibold px-3 py-1 tracking-wider uppercase">
              {STATUS_LABELS[listing.status] || listing.status?.replace("_", " ") || "למכירה"}
            </span>
            {listing.is_featured && (
              <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-semibold px-3 py-1 tracking-wider uppercase">
                נבחר
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
              <h2 id="listing-dialog-title" className="mt-1 text-xl font-bold text-[#0A1628] leading-tight">
                {listing.title}
              </h2>
            </div>
            <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 font-medium capitalize whitespace-nowrap">
              {TYPE_LABELS[listing.property_type] || listing.property_type?.replace("_", " ")}
            </span>
          </div>

          {(listing.neighborhood || listing.city) && (
            <p className="mt-2 text-slate-400 text-sm flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
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
                <Bed className="w-4 h-4" aria-hidden="true" /> {listing.bedrooms} חדרים
              </span>
            )}
            {listing.bathrooms != null && (
              <span className="flex items-center gap-1.5">
                <Bath className="w-4 h-4" aria-hidden="true" /> {listing.bathrooms} חדרי רחצה
              </span>
            )}
            {listing.area_sqft != null && (
              <span className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4" aria-hidden="true" /> {listing.area_sqft} מ"ר
              </span>
            )}
          </div>

          {/* Building details */}
          {listing.property_type === "building" && (listing.total_apartments || listing.apartment_breakdown?.length > 0) && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-[#0A1628] uppercase tracking-wider mb-3">
                פרטי בניין
              </h3>
              {listing.total_apartments && (
                <p className="text-slate-600 text-sm mb-3">
                  <span className="font-medium">סה"כ דירות:</span> {listing.total_apartments}
                </p>
              )}
              {listing.apartment_breakdown?.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {listing.apartment_breakdown.map((b) => (
                    <div key={b.rooms} className="bg-slate-50 px-3 py-2 text-center">
                      <p className="text-lg font-bold text-[#0A1628]">{b.count}</p>
                      <p className="text-xs text-slate-500">{b.rooms} חדרים</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {listing.description && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-[#0A1628] uppercase tracking-wider mb-2">
                תיאור
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
