import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { logOut } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { removeFromCart, addToCart } from "../../redux/cart/slice";
import { selectCartItems } from "../../redux/cart/selectors";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import s from "./CartPage.module.css";

const schema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{9,15}$/, "Invalid phone number")
    .required("Phone is required"),
  address: yup.string().trim().required("Address is required"),
  payment: yup.string().required("Select a payment method"),
});

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector((s) => s.auth.token);
  const handleLogout = () => dispatch(logOut());

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0).toFixed(2);
  }, [items]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      payment: "Cash On Delivery",
    },
  });

  const paymentValue = watch("payment");

  const handlePlaceOrder = async (values) => {
    if (!token) {
      toast.error("Please log in to place your order.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const res = await axios.post(
        "https://e-pharmacy-backend-bad9.onrender.com/api/cart/checkout",
        { ...values, items, total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Order success:", res.data);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
      } else {
        toast.error("Failed to place order.");
      }
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className={s.page}>
        <h1 className={s.title}>Cart</h1>
        <div className={s.container}>
          <section className={s.formSection}>
            <h2 className={s.formTitle}>Enter shipping info</h2>
            <p className={s.formText}>
              Enter your delivery address where you get the product. You can also send any other
              location where you send the products.
            </p>

            <form className={s.form} onSubmit={handleSubmit(handlePlaceOrder)} noValidate>
              <div className={s.inputGroupWrapper}>
                <div className={s.inputGroup}>
                  <label htmlFor="name" className={s.label}>Name</label>
                  <input
                    id="name"
                    className={`${s.input} ${errors.name ? s.inputError : ""}`}
                    placeholder="Enter text"
                    {...register("name")}
                  />
                  {errors.name && <p className={s.err}>{errors.name.message}</p>}
                </div>

                <div className={s.inputGroup}>
                  <label htmlFor="email" className={s.label}>Email</label>
                  <input
                    id="email"
                    className={`${s.input} ${errors.email ? s.inputError : ""}`}
                    placeholder="Enter text"
                    {...register("email")}
                  />
                  {errors.email && <p className={s.err}>{errors.email.message}</p>}
                </div>

                <div className={s.inputGroup}>
                  <label htmlFor="phone" className={s.label}>Phone</label>
                  <input
                    id="phone"
                    className={`${s.input} ${errors.phone ? s.inputError : ""}`}
                    placeholder="Enter text"
                    {...register("phone")}
                  />
                  {errors.phone && <p className={s.err}>{errors.phone.message}</p>}
                </div>

                <div className={s.inputGroup}>
                  <label htmlFor="address" className={s.label}>Address</label>
                  <input
                    id="address"
                    className={`${s.input} ${errors.address ? s.inputError : ""}`}
                    placeholder="Enter text"
                    {...register("address")}
                  />
                  {errors.address && <p className={s.err}>{errors.address.message}</p>}
                </div>
              </div>

              <div className={s.wrapper}>
                <h3 className={s.paywentTitle}>Payment method</h3>
                <p className={s.paymentText}>
                  You can pay us in a multiple way in our payment gateway system.
                </p>
                <div className={s.paymentOptions}>
                  <label className={s.radioLabel}>
                    <input
                      type="radio"
                      value="Cash On Delivery"
                      {...register("payment")}
                      checked={paymentValue === "Cash On Delivery"}
                    />
                    Cash On Delivery
                  </label>
                  <label className={s.radioLabel}>
                    <input
                      type="radio"
                      value="Bank"
                      {...register("payment")}
                      checked={paymentValue === "Bank"}
                    />
                    Bank
                  </label>
                </div>
                {errors.payment && <p className={s.err}>{errors.payment.message}</p>}
              </div>

              <h3 className={s.details}>Order details</h3>
              <p className={s.detailsText}>
                Shipping and additional costs are calculated based on values you have entered.
              </p>

              <div className={s.totalBox}>
                <span>Total:</span>
                <span>${total}</span>
              </div>

              <button type="submit" className={s.placeOrder} disabled={isSubmitting}>
                {isSubmitting ? "Placing order..." : "Place order"}
              </button>
            </form>
          </section>

          <section className={s.itemsSection}>
            {items.length === 0 ? (
              <p className={s.empty}>Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className={s.itemCard}>
                  <img className={s.image} src={item.photo} alt={item.name} />
                  <div className={s.itemInfo}>
                    <div className={s.wrapperCard}>
                      <div className={s.titleBlock}>
                        <h4 className={s.name}>{item.name}</h4>
                        <p className={s.suppliers}>{item.suppliers}</p>
                      </div>
                      <p className={s.price}>${Number(item.price).toFixed(2)}</p>
                    </div>

                    <div className={s.actions}>
                      <div className={s.quantity}>
                        <button
                          className={s.quantityBtn}
                          onClick={() => dispatch(addToCart(item))}
                        >
                          <svg className={s.iconQuantity} width="18" height="18" aria-hidden="true">
                            <use href="/icons.svg#plus" />
                          </svg>
                        </button>

                        <span className={s.number}>{item.quantity || 1}</span>

                        <button
                          className={s.quantityBtn}
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <svg className={s.iconQuantity} width="18" height="18" aria-hidden="true">
                            <use href="/icons.svg#minus" />
                          </svg>
                        </button>
                      </div>

                      <button
                        className={s.removeBtn}
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
