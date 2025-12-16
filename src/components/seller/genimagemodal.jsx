import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { MoreVertical, Edit, Trash, Upload } from "lucide-react";
import { DeleteGenaralImageAPI, editGenaralImageAPI } from "../../api/products";
import ConfirmModal from "./ConfirmModal"; // reusable tiny modal
import styles from "./genimagemodal.module.css";

export default function ImageMenu({ slug, imgId, imgUrl, onDelete, onEdit }) {
  const [open, setOpen]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileRef = useRef(null);

  /* ---------- REPLACE IMAGE ---------- */
  const openPicker = () => fileRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    try {
      await editGenaralImageAPI(slug, imgId, form);
      toast.success("Image updated");
      onEdit(imgId, file); // parent can update src if needed
      setOpen(false)
    } catch {
      toast.error("Update failed");
    }
    e.target.value = ""; // reset
  };

  /* ---------- DELETE ---------- */
  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      await DeleteGenaralImageAPI(slug, imgId);
      toast.success("Image removed");
      onDelete(imgId);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.dots} onClick={() => setOpen((v) => !v)}>
          <MoreVertical size={16} />
        </button>

        {open && (
          <div className={styles.dropdown}>
            <button className={styles.item} onClick={openPicker}>
              <Upload size={14} /> Replace
            </button>
            <button className={styles.item} onClick={() => { setOpen(false); setShowConfirm(true); }}>
              <Trash size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      {/* hidden file input */}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className={styles.hidden} />

      {/* designed confirmation */}
      {showConfirm && (
        <ConfirmModal
          title="Delete image"
          message="Are you sure? This cannot be undone."
          onCancel={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}