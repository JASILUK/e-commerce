import { useNavigate } from "react-router-dom";

const EmptyCartUI = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="empty-cart-wrapper d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        minHeight: "75vh",
        padding: "20px",
      }}
    >
      <div 
        className="empty-card shadow"
        style={{
          background: "#ffffff",
          borderRadius: "22px",
          padding: "40px 30px",
          maxWidth: "440px",
          width: "100%",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <div 
          className="image-container"
          style={{
            background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            style={{ width: "80px", opacity: 0.95 }}
          />
        </div>

        <h2 
          className="fw-bold mt-4"
          style={{
            fontSize: "1.9rem",
            color: "#333",
            letterSpacing: "-0.5px",
          }}
        >
          Your Cart is Empty
        </h2>

        <p 
          className="text-muted mt-2"
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.6",
            maxWidth: "350px",
            margin: "0 auto",
          }}
        >
          You haven't added anything yet. Explore our collection and find something you love!
        </p>

        <button
          className="btn btn-primary px-4 py-2 mt-4"
          style={{
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(52, 152, 219, 0.3)",
            transition: "0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          onClick={() => navigate("/collection")}
        >
          Start Shopping
        </button>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default EmptyCartUI;
