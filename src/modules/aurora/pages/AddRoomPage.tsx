import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useAppDispatch } from "../app/hooks";
import { addRoom } from "../features/rooms/roomsSlice";
import { p } from "../routes";

interface FormValues {
  name: string;
  price: number | "";
  capacity: number | "";
  description: string;
  image: string;
}

// Yup ვალიდაცია
const validationSchema = Yup.object({
  name: Yup.string().trim().required("ოთახის ნომერი/დასახელება სავალდებულოა"),
  price: Yup.number()
    .typeError("ფასი უნდა იყოს რიცხვი")
    .min(10, "მინიმალური ფასია 10")
    .required("ფასი სავალდებულოა"),
  capacity: Yup.number()
    .typeError("ტევადობა უნდა იყოს რიცხვი")
    .min(1, "მინიმუმ 1 სტუმარი")
    .max(10, "მაქსიმუმ 10 სტუმარი")
    .required("ტევადობა სავალდებულოა"),
  description: Yup.string().max(300, "მაქსიმუმ 300 სიმბოლო"),
  image: Yup.string().url("შეიყვანეთ სწორი URL"),
});

export default function AddRoomPage() {
  const dispatch = useAppDispatch(); // useDispatch-ით ახალი ნომრის დამატება
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: { name: "", price: "", capacity: "", description: "", image: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addRoom({
          name: values.name.trim(),
          price: Number(values.price),
          capacity: Number(values.capacity),
          description: values.description.trim(),
          image: values.image,
        })
      );
      resetForm();
      navigate(p("/rooms"));
    },
  });

  const error = (field: keyof FormValues) =>
    formik.touched[field] && formik.errors[field] ? (
      <AnimatePresence>
        <motion.span
          className="error"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {formik.errors[field] as string}
        </motion.span>
      </AnimatePresence>
    ) : null;

  const cls = (field: keyof FormValues) =>
    `input ${formik.touched[field] && formik.errors[field] ? "input-error" : ""}`;

  return (
    <PageTransition>
      <div className="form-wrap">
        <motion.form
          className="form-card"
          onSubmit={formik.handleSubmit}
          noValidate
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="page-title">ახალი ოთახის დამატება</h1>
          <p className="muted">შეავსეთ ველები და ოთახი გამოჩნდება კატალოგში.</p>

          <label className="field">
            ოთახის ნომერი / დასახელება *
            <input id="name" type="text" placeholder="მაგ: 305 – დელუქსი"
              className={cls("name")} {...formik.getFieldProps("name")} />
            {error("name")}
          </label>

          <div className="two-cols">
            <label className="field">
              ფასი ღამეში ($) *
              <input id="price" type="number" placeholder="მაგ: 120"
                className={cls("price")} {...formik.getFieldProps("price")} />
              {error("price")}
            </label>
            <label className="field">
              ტევადობა (სტუმარი) *
              <input id="capacity" type="number" placeholder="1 - 10"
                className={cls("capacity")} {...formik.getFieldProps("capacity")} />
              {error("capacity")}
            </label>
          </div>

          <label className="field">
            სურათის URL (არასავალდებულო)
            <input id="image" type="text" placeholder="https://..."
              className={cls("image")} {...formik.getFieldProps("image")} />
            {error("image")}
          </label>

          <label className="field">
            აღწერა (არასავალდებულო)
            <textarea id="description" rows={4} placeholder="მოკლე აღწერა ოთახის შესახებ..."
              className={cls("description")} {...formik.getFieldProps("description")} />
            {error("description")}
          </label>

          <motion.button
            type="submit"
            className="btn btn-block"
            disabled={formik.isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            ოთახის დამატება
          </motion.button>
        </motion.form>
      </div>
    </PageTransition>
  );
}
