import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { addGenaralImageAPI } from "../../api/products";
import { Plus } from "lucide-react";
import styles from "./genimagestyle.module.css";

export default function AddGeneralImages({ slug, onSuccess }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const openPicker = () => fileRef.current?.click();

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const form = new FormData();
    files.forEach((f) => form.append("image", f));

    try {
      await addGenaralImageAPI(slug, form);
      toast.success("Images added");
      onSuccess(); // refresh parent
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input so same file can be re-selected
    }
  };

  return (
    <div className={styles.addImageBox}>
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className={styles.hiddenInput}
      />
      <button
        onClick={openPicker}
        disabled={uploading}
        className={styles.addBtn}
      >
        <Plus size={18} /> {uploading ? "Uploading..." : "Add Images"}
      </button>
    </div>
  );
}