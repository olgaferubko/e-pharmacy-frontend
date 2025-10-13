import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `https://e-pharmacy-backend-bad9.onrender.com/api/products/${id}`
        );
        setProduct(data.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p className={s.loading}>Loading...</p>;

  return (
    <main className={s.page}>
      <section className={s.overview}>
        <img src={product.photo} alt={product.name} className={s.image} />
        <div className={s.info}>
          <h1>{product.name}</h1>
          <p>Brand: {product.suppliers}</p>
          <p className={s.price}>€{product.price}</p>
          <div className={s.actions}>
            <div className={s.quantity}>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <button className={s.addToCart}>Add to cart</button>
          </div>
        </div>
      </section>

      <section className={s.tabs}>
        <div className={s.tabButtons}>
          <button
            onClick={() => setTab("description")}
            className={tab === "description" ? s.active : ""}
          >
            Description
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={tab === "reviews" ? s.active : ""}
          >
            Reviews
          </button>
        </div>

        {tab === "description" && (
          <div className={s.description}>
            {product.description.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div className={s.reviews}>
            {product.reviews?.length > 0 ? (
              product.reviews.map((r, i) => (
                <div key={i} className={s.review}>
                  <p className={s.user}>{r.userName}</p>
                  <p className={s.comment}>{r.comment}</p>
                  <p className={s.rating}>⭐ {r.rating}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
