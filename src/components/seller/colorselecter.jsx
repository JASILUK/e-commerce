import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import styles from "./colorselect.module.css";
import { addProductColorAPI ,getAllColorsAPI} from "../../api/products";

export default function ColorSelector({ slug, onSuccess }) {
  const [colors, setColors] = useState([]); // all global colours
  const [selected, setSelected] = useState([]); // ids picked

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      const { data } = await getAllColorsAPI(slug); // GET /categories/colors/
      setColors(data);
    } catch {
      toast.error("Failed to load colours");
    }
  };

  const toggle = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((i) => i !== id) : [...s, id]
    );

  const handleAdd = async () => {
    if (!selected.length) return toast.warn("No colour selected");

    const payload = selected.map((id) => ({ color: id }));
    try {
      await addProductColorAPI(slug, payload); // POST many
      toast.success("Colours added");
      setSelected([]);
      onSuccess(); // refresh parent
    } catch {
      toast.error("Add failed");
    }
  };

  return (
    <div className={styles.card}>
      <h4>Select Colours</h4>
      <div className={styles.grid}>
        {colors.map((c) => (
          <button
            key={c.id}
            onClick={() => toggle(c.id)}
            className={`${styles.swatch} ${
              selected.includes(c.id) ? styles.active : ""
            }`}
            title={c.name}
          >
            <span
              className={styles.colorDot}
              style={{ backgroundColor: c.code }}
            />
            <span className={styles.name}>{c.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          onClick={handleAdd}
          disabled={!selected.length}
          className={styles.addBtn}
        >
          <Plus size={16} /> Add ({selected.length})
        </button>
      </div>
    </div>
  );
}