"use client";
import { menuSchema } from "@/features/menu/schemas/menuSchema";
import useMenuStore, { IMenu } from "@/store/useMenuStore";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { MdEventNote } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function EditMenuPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { updateMenu, getMenuById, menus } = useMenuStore();

  const formik = useFormik({
    initialValues: {
      title: "",
      href: "",
      parentId: "",
    },
    validationSchema: menuSchema,
    onSubmit: ({ title, href, parentId }: Omit<IMenu, "id">) => {
      updateMenu(id, { title, href, parentId });
      toast.info("Menu updated successfully.");
      router.push("/admin/menu");
    },
  });

  useEffect(() => {
    const getDetailMenu = getMenuById(id);
    formik.setValues({
      title: getDetailMenu?.title || "",
      href: getDetailMenu?.href || "",
      parentId: getDetailMenu?.parentId || "",
    });
  }, []);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-700">Edit Menu</h1>
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
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-200">
                    Parent Menu (List Only Parent)
                  </legend>
                  <select
                    name="parentId"
                    id="parentId"
                    className="select select-accent w-full"
                    onChange={formik.handleChange}
                    value={formik.values.parentId ?? ""}
                  >
                    <option value="">Root</option>
                    {menus
                      .filter((menu) => !menu.parentId)
                      .map((menu) => (
                        <option key={menu.id} value={menu.id}>
                          {menu.title}
                        </option>
                      ))}
                  </select>
                  {formik.errors.parentId && formik.touched.parentId && (
                    <div className="feedback text-red-400">
                      {formik.errors.parentId}
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
