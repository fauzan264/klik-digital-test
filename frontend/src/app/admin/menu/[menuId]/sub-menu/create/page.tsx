"use client";
import { menuSchema } from "@/features/menu/schemas/menuSchema";
import useMenuStore, { IMenu } from "@/store/useMenuStore";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { MdEventNote } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CreateSubMenuPage() {
  const { menuId } = useParams<{
    menuId: string;
  }>();
  const router = useRouter();
  const { addMenu } = useMenuStore();

  const formik = useFormik({
    initialValues: {
      title: "",
      href: "",
    },
    validationSchema: menuSchema,
    onSubmit: ({ title, href }: Omit<IMenu, "id">) => {
      addMenu({ title, href, parentId: menuId });
      toast.info("Menu created successfully.");
      router.push(`/admin/menu/${menuId}`);
    },
  });

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-700">Create Menu</h1>
      <div className="card bg-teal-700 my-5">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-1">
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Title
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <MdEventNote />
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                  </label>
                  {formik.errors.title && formik.touched.title && (
                    <div className="feedback text-red-400">
                      {formik.errors.title}
                    </div>
                  )}
                </fieldset>
              </div>
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Route/Href
                  </legend>
                  <label
                    htmlFor=""
                    className="input input-accent validator w-full"
                  >
                    <FaLink />
                    <input
                      type="text"
                      name="href"
                      id="href"
                      onChange={formik.handleChange}
                      value={formik.values.href ?? ""}
                    />
                  </label>
                  {formik.errors.href && formik.touched.href && (
                    <div className="feedback text-red-400">
                      {formik.errors.href}
                    </div>
                  )}
                </fieldset>
              </div>

              <button
                type="submit"
                className="btn border-0 bg-teal-400 hover:bg-teal-300 active:bg-teal-600 transition ease-in-out duration-300 text-gray-100 w-full mt-5 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
