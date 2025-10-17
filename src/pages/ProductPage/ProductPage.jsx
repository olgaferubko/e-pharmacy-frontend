import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { addToCart, decreaseQuantity } from "../../redux/cart/slice";
import { selectCartItems } from "../../redux/cart/selectors";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import s from "./ProductPage.module.css";

export default function ProductPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleLogout = () => dispatch(logOut());
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [tab, setTab] = useState("description");
  const [loading, setLoading] = useState(true);

  const items = useSelector(selectCartItems);
  const cartItem = items.find((i) => i.id === product?._id || i.id === product?.id);
  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `https://e-pharmacy-backend-bad9.onrender.com/api/products/${id}`
        );

        const productData = data.data || data;
        setProduct(productData);
        setReviews(productData.reviews || []);
      } catch (err) {
        console.error("Failed to fetch product:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading || !product) return <p className={s.loading}>Loading...</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className={s.page}>
        <section className={s.overview}>
          <img src={product.photo} alt={product.name} className={s.image} />

          <div className={s.infoWrapper}>
            <div className={s.info}>
              <div className={s.nameWrapper}>
                <h3 className={s.name}>{product.name}</h3>
                <p className={s.supplier}>{product.suppliers}</p>
              </div>
              <p className={s.price}>${product.price}</p>
            </div>

            <div className={s.actions}>
              <div className={s.quantity}>
                <button
                  className={s.quantityBtn}
                  onClick={() => dispatch(addToCart(product))}
                >
                  <svg className={s.iconQuantity} width="20" height="20" aria-hidden="true">
                    <use href="/icons.svg#plus" />
                  </svg>
                </button>

                <span className={s.number}>{quantity}</span>

                <button
                  className={s.quantityBtn}
                  onClick={() => dispatch(decreaseQuantity(product._id || product.id))}
                >
                  <svg className={s.iconQuantity} width="20" height="20" aria-hidden="true">
                    <use href="/icons.svg#minus" />
                  </svg>
                </button>
              </div>

              <button className={s.addToCart} onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </section>

        <section className={s.tabs}>
          <div className={s.tabButtons}>
            <button
              onClick={() => setTab("description")}
              className={`${s.tabButton} ${tab === "description" ? s.active : ""}`}
            >
              Description
            </button>
            <button
              onClick={() => setTab("reviews")}
              className={`${s.tabButton} ${tab === "reviews" ? s.active : ""}`}
            >
              Reviews
            </button>
          </div>

          {tab === "description" && (
            <div className={s.description}>
              {Array.isArray(product.description) ? (
                product.description.map((d, i) => {
                  if (i === 0)
                    return (
                      <p key={i} className={s.firstParagraph}>
                        {d}
                      </p>
                    );

                  const [title, ...rest] = d.split(":");
                  const content = rest.join(":");
                  return (
                    <p key={i}>
                      <span className={s.label}>{title}:</span>
                      <span className={s.text}>{content}</span>
                    </p>
                  );
                })
              ) : typeof product.description === "object" ? (
                Object.entries(product.description).map(([key, value], i) => (
                  <p key={i}>
                    <span className={s.label}>
                      {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}:
                    </span>{" "}
                    <span className={s.text}>{value}</span>
                  </p>
                ))
              ) : (
                <p>{product.description}</p>
              )}
            </div>
          )}

          {tab === "reviews" && (
            <div className={s.reviews}>
              {reviews.length > 0 ? (
                reviews.map((r, i) => (
                  <div key={r._id || r.id || i} className={s.review}>
                    <div className={s.topWrapper}>
                      <div className={s.wrapper}>
                        {r.photo ? (
                          <img
                            src={r.photo}
                            alt={r.reviewer || r.userName}
                            className={s.avatarImage}
                          />
                        ) : (
                          <div className={s.avatar} aria-hidden="true">
                            <svg className={s.avatarIcon} width="22" height="22">
                              <use href="/icons.svg#user" />
                            </svg>
                          </div>
                        )}
                        <p className={s.user}>
                          {r.userName || r.reviewer}
                          <span className={s.days}>
                            {r.daysAgo || r.time || "Recently"} days ago
                          </span>
                        </p>
                      </div>

                      <p className={s.rating}>
                        <span className={s.mobileRating}>
                          <svg className={s.star} width="16" height="16" aria-hidden="true">
                            <use href="/icons.svg#star" />
                          </svg>
                          {r.rating}
                        </span>
                        <span className={s.desktopRating}>
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              className={`${s.star} ${index < r.rating ? s.filled : s.empty}`}
                              width="16"
                              height="16"
                              aria-hidden="true"
                            >
                              <use href="/icons.svg#star" />
                            </svg>
                          ))}
                          <span className={s.ratingNumber}> {r.rating}</span>
                        </span>
                      </p>
                    </div>
                    <p className={s.comment}>{r.comment || r.review}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
