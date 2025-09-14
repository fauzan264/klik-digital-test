"use client";
import useMenuStore from "@/store/useMenuStore";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function MenuPage() {
  const { menus, deleteMenu } = useMenuStore();

  const onDeleteMenu = ({ id }: { id: string }) => {
    Swal.fire({
      title: `Are you sure you want to delete the event?`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const count = menus.filter((menu) => menu.parentId == id).length;
        if (count >= 1) {
          toast.error(
            "Cannot delete this menu because it still has sub menus. Please delete them first."
          );
        } else {
          deleteMenu(id);
          toast.success("Menu deleted successfully.");
        }
      }
    });
  };

  return (
    <div className="mx-auto w-11/12 my-10">
      <div className="flex">
        <h1 className="text-2xl text-gray-700">List Menu Management</h1>
        <Link
          href="/admin/menu/create"
          className="btn btn-sm bg-blue-700 ml-auto text-gray-200 hover:bg-blue-800 active:bg-blue-800 transition ease-in-out duration-300 focus:outline-none focus:ring-0 border-0"
        >
          Tambah Menu
        </Link>
      </div>
      <div className="card bg-teal-700 my-5">
        <div className="card-body">
          <div className="overflow-x-auto ">
            <table className="table border-border-gray-100">
              <thead>
                <tr>
                  <th className="text-gray-200">Title</th>
                  <th className="text-gray-200">Route</th>
                  <th className="text-gray-200">#</th>
                </tr>
              </thead>
              <tbody>
                {menus
                  ?.filter((menu) => !menu.parentId)
                  .map((menu) => {
                    return (
                      <tr key={menu.id}>
                        <td className="text-gray-200">{menu.title}</td>
                        <td className="text-gray-200">{menu.href ?? "#"}</td>
                        <td>
                          <Link
                            href={`/admin/menu/${menu.id}`}
                            className="btn btn-success btn-sm text-gray-200 hover:shadow-md mx-2 my-2"
                          >
                            Detail
                          </Link>
                          <Link
                            href={`/admin/menu/edit/${menu.id}`}
                            className="btn btn-info btn-sm text-gray-200 hover:shadow-md mx-2 my-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              onDeleteMenu({
                                id: menu.id,
                              });
                            }}
                            className="btn btn-error btn-sm text-gray-200 hover:shadow-md mx-2 my-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
