"use client";
import { loginSchema } from "@/features/auth/schemas/loginSchema";
import useAuthStore from "@/store/useAuthStore";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const VALID_USER = "admin";
const VALID_PASS = "pass123";

export default function Home() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const onLogin = ({ username, password }: IAuthLogin) => {
    if (username == VALID_USER && password == VALID_PASS) {
      setAuth({ username });
      router.push("/admin");
    } else {
      toast.error("Invalid username or password");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ username, password }) => {
      onLogin({ username, password });
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center mt-15">
      <div className="card card-border card-md bg-teal-100 shadow-sm p-5 rounded-xl">
        <div className="card-body">
          <div className="card-title justify-center text-gray-800">Login</div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-800">
                    Username
                  </legend>
                  <label className="input input-accent validator w-full">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </label>
                  {formik.errors.username && formik.touched.username && (
                    <div className="feedback text-red-600">
                      {formik.errors.username}
                    </div>
                  )}
                </fieldset>
              </div>
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-800">
                    Password
                  </legend>
                  <label className="input input-accent validator w-full">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </label>
                  {formik.errors.password && formik.touched.password && (
                    <div className="feedback text-red-600">
                      {formik.errors.password}
                    </div>
                  )}
                </fieldset>
              </div>
              <button
                type="submit"
                className="btn border-0 bg-teal-500 hover:bg-teal-600 active:bg-teal-600 transition ease-in-out duration-300 text-gray-100 w-full mt-5 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
