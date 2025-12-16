import React from "react";
import "./sizeSelect.css";

const SizeSelector = ({ variants, selectedVariant, onSelect }) => {
  return (
    <div className="size-wrapper">
      {variants.map((v) => {
        const isSelected = selectedVariant?.id === v.id;
        const outOfStock = v.stock <= 0;

        return (
          <div
            key={v.id}
            className={`size-box ${isSelected ? "selected" : ""} ${outOfStock ? "disabled" : ""}`}
            onClick={() => !outOfStock && onSelect(v)}
          >
            {/* STOCK BADGE */}
            {outOfStock ? (
              <span className="stock-badge out">Out</span>
            ) : (
              <span className="stock-badge in">{v.stock}</span>
            )}

            {/* SIZE TEXT */}
            <span className="size-text">{v.size}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SizeSelector;