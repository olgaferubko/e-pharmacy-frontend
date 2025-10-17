import { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import MedicineList from "../../components/MedicineList/MedicineList";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import s from "./MedicinePage.module.css";

export default function MedicinePage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleLogout = () => {
    dispatch(logOut());
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const handleResetFilters = () => {
    setQuery("");
    setCategory("");
    setPage(1);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://e-pharmacy-backend-bad9.onrender.com/api/products",
        {
          params: {
            page,
            limit: 12,
            name: query,
            category,
            nocache: Date.now(),
          },
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      const list = data.products || data.data || [];
      setProducts(list);
      setTotalPages(data.totalPages || data.meta?.totalPages || 1);
    } catch (err) {
      console.error("Products fetch failed:", err.response?.data || err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, query, category]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://e-pharmacy-backend-bad9.onrender.com/api/products/categories"
      );
      if (data?.data && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.error("Unexpected categories format:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error.response?.data || error.message);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className={s.page}>
        <h1 className={s.title}>Medicine</h1>

        <FilterPanel
          categories={categories}
          query={query}
          category={category}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onFilter={fetchProducts}
          onReset={handleResetFilters}
        />

        {loading ? (
          <p className={s.loading}>Loading...</p>
        ) : products.length === 0 ? (
          <p className={s.empty}>Nothing was found for your request</p>
        ) : (
          <>
            <MedicineList items={products} />
            {totalPages > 1 && (
              <Pagination current={page} total={totalPages} onChange={setPage} />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
