import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getproductDetailed } from "../api/products";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import SizeSelector from "../components/sizeSelector";
import BuyNowModal from "../components/BuyNowModel";

function ProductDitails() {
  const [products, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const galleryRef = useRef(null);
   const [showBuyModal, setShowBuyModal] = useState(false);


  const { slug } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchproduct();
  }, [slug]);

  const fetchproduct = async () => {
    try {
      const { data } = await getproductDetailed(slug);
      setProduct(data);
      console.log(data)

      // Default Color
      if (data.colors?.length > 0) {
        const firstColor = data.colors[0];
        setSelectedColor(firstColor);
        loadImagesForColor(firstColor, data.general_images);
      } else {
        const generalImgs =
          data.general_images?.map((img) => ({ image: img.genral_image })) || [];
        setCurrentImages(generalImgs);
        setMainImage(generalImgs[0]?.image || data.thumbnail_url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadImagesForColor = (colorObj, general) => {
    const colorImages =
      colorObj.images
        ?.filter((i) => i.image_url)
        .map((i) => ({ image: i.image_url })) || [];

    if (colorImages.length > 0) {
      setCurrentImages(colorImages);
      setMainImage(colorImages[0].image);
      return;
    }

    const generalImgs =
      general?.filter((i) => i.genral_image).map((i) => ({ image: i.genral_image })) ||
      [];

    setCurrentImages(generalImgs);
    setMainImage(generalImgs[0]?.image || products?.thumbnail_url);
  };

  const handleColorSelect = (colorObj) => {
    setSelectedColor(colorObj);
    setSelectedVariant(null);
    loadImagesForColor(colorObj, products.general_images);
  };

  const cartproduct = async () => {
    if (!selectedColor) return toast.error("Select a color!");
    if (!selectedVariant) return toast.error("Select a size!");

    const { success, msg } = await addToCart(selectedVariant.id, 1);

    if (!success) return toast.error(msg);

    toast.success("Added to cart!");
    navigate("/cart");
  };

  const buyNowClick = () => {
    if (!selectedVariant) return toast.error("Select a size!");
    setShowBuyModal(true);
  };

  const confirmBuyNow = async (qty) => {
    setShowBuyModal(false);
      navigate(`/checkout?mode=buy_now&variant=${selectedVariant.id}&qty=${qty}`);
 
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-center text-primary">Product Details</h2>
      <p className="text-center text-muted">Explore details and add to your cart.</p>
      <BuyNowModal 
      open={showBuyModal}
      maxStock={selectedVariant?.stock ||0}
      onClose={()=>setShowBuyModal(false)}
      onConfirm={confirmBuyNow}
      />
      {products && (
        <div className="row g-4">

          {/* LEFT IMAGES */}
          <div className="col-lg-6">
            <div className="d-flex gap-3">

              {/* SIDE IMAGES */}
              {currentImages.length > 0 && (
                <div style={{ width: "90px" }}>
                  <div
                    ref={galleryRef}
                    style={{
                      maxHeight: "400px",
                      overflowY: "auto",
                    }}
                    className="d-flex flex-column gap-2"
                  >
                    {currentImages.map((img, i) => (
                      <img
                        key={i}
                        src={img.image}
                        onClick={() => setMainImage(img.image)}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                          border: mainImage === img.image
                            ? "3px solid #0d6efd"
                            : "2px solid #ddd",
                        }}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* MAIN IMAGE */}
              <div className="flex-grow-1 p-3 border rounded bg-white shadow-sm d-flex align-items-center justify-content-center">
                <img
                  src={mainImage || products.thumbnail_url}
                  className="img-fluid rounded"
                  style={{ maxHeight: "500px", objectFit: "contain" }}
                  alt=""
                />
              </div>

            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="col-lg-6">
            <div className="p-4 bg-light border rounded shadow-sm">

              {/* NAME + DESCRIPTION */}
              <h2>{products.name}</h2>
              <p className="text-muted">{products.description}</p>

              {/* PRICE */}
              <div className="my-3">
                <s className="text-muted">₹{products.price}</s>
                <span className="fw-bold fs-4 ms-2">₹{products.final_price}</span>
              </div>

              {/* COLORS */}
              {products.colors?.length > 0 && (
                <div className="mb-3">
                  <label className="fw-semibold">
                    Color: <span className="text-primary">{selectedColor?.color?.name}</span>
                  </label>

                  <div className="d-flex gap-2 flex-wrap mt-2">
                    {products.colors.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleColorSelect(c)}
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "50%",
                          backgroundColor: c.color.code,
                          cursor: "pointer",
                          border:
                            selectedColor?.id === c.id
                              ? "3px solid blue"
                              : "2px solid #ccc",
                          boxShadow:
                            selectedColor?.id === c.id ? "0px 0px 8px rgba(0,0,255,0.5)" : "",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}

              {/* SIZES / VARIANTS */}
              {selectedColor?.variants?.length > 0 && (
              <div className="mb-3">
                <label className="fw-semibold mb-3">Select Size </label>

                <SizeSelector
                  variants={selectedColor.variants}
                  selectedVariant={selectedVariant}
                  onSelect={(v) => setSelectedVariant(v)}
                />
              </div>
            )}

              {/* ADD TO CART */}
              <button className="btn btn-primary px-4 py-2 mt-3" onClick={cartproduct}>
                🛒 Add to Cart
              </button>
               <button className="btn btn-danger px-4 py-2 mt-3 ms-2" onClick={buyNowClick}>
            ⚡ Buy Now
          </button>
            
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default ProductDitails;
