import useAuthStore from "@/store/useAuthStore";
import useMenuStore, { IMenu } from "@/store/useMenuStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function Sidebar({ children }: { children: ReactNode }) {
  const { username } = useAuthStore();
  const pathname = usePathname();
  const { menus } = useMenuStore();
  const [sideMenu, setSideMenu] = useState<IMenu[]>([
    { id: nanoid(), href: "/admin", title: "Dashboard", parentId: null },
    {
      id: "ah31oS_xvO9EClUsVy9gr",
      href: "/admin/menu",
      title: "Menu management",
      parentId: null,
    },
  ]);

  useEffect(() => {
    // setSideMenu([...sideMenu, ...(menus || [])]);
    const combined = [...sideMenu, ...(menus ?? [])];

    const unique = combined.filter(
      (menu, index, self) => index === self.findIndex((m) => m.id === menu.id)
    );

    setSideMenu(unique);
  }, [menus]);
  return (
    <div className="flex flex-1 pt-16">
      <div className="drawer lg:drawer-open">
        <input type="checkbox" id="my-drawer" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center bg-teal-50">
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-gray-200 min-h-full w-80 p-4 pt-18 md:pt-3">
            {sideMenu
              .filter((menu) => !menu.parentId)
              .map((menu) => {
                const children = sideMenu.filter(
                  (sub) => sub.parentId === menu.id
                );

                return (
                  <li
                    key={menu.id}
                    className="text-md font-semibold text-teal-700"
                  >
                    {children.length > 0 ? (
                      <details open>
                        <summary className="cursor-pointer hover:text-teal-900">
                          {menu.title}
                        </summary>
                        <ul>
                          {children.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={sub.href ?? "#"}
                                className="py-2 px-4 rounded-md flex items-center transition-colors text-teal-700 hover:bg-teal-700 hover:text-white"
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link
                        href={menu.href ?? "#"}
                        className="py-2 px-4 rounded-md flex items-center transition-colors text-teal-700 hover:bg-teal-700 hover:text-white"
                      >
                        {menu.title}
                      </Link>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
