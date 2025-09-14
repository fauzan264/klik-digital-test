import * as yup from "yup";

export const menuSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  href: yup.string(),
});
