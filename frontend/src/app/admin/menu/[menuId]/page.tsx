"use client";
import { useParams } from "next/navigation";
import useMenuStore from "@/store/useMenuStore";
import Link from "next/link";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function MenuDetailPage() {
  const { menuId } = useParams<{ menuId: string }>();
  const { getMenuById, menus, deleteMenu } = useMenuStore();
  const detailMenu = getMenuById(menuId);

  const onDeleteMenu = ({ id }: { id: string }) => {
    Swal.fire({
      title: `Are you sure you want to delete the event?`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteMenu(id);
        toast.success("Menu deleted successfully.");
      }
    });
  };

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-700">Detail Menu</h1>
      <div className="card bg-teal-700 my-5">
        <div className="card-body">
          <div className="flex justify-between items-start p-6 flex-col md:flex-row-reverse">
            <div className="w-full">
              <h1 className="text-xl text-gray-200 font-semibold pb-5">
                Menu Info
              </h1>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Title</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {detailMenu?.title ?? ""}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Route</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {detailMenu?.href ? detailMenu?.href : "#"}
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="text-gray-300 w-40 flex-grow-0">Parent Menu</p>
                <p className="font-semibold text-gray-200 flex-grow-0">
                  {detailMenu?.parentId
                    ? menus
                        .filter((menu) => menu.id == detailMenu?.parentId)
                        .map((menu) => <>{menu.title}</>)
                    : "#"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-teal-700 my-5">
        <div className="card-body">
          <h1 className="text-xl text-gray-200">Sub Menu</h1>
          <Link
            href={`/admin/menu/${menuId}/sub-menu/create`}
            className="btn btn-sm bg-blue-700 ml-auto text-gray-200 hover:bg-blue-800 active:bg-blue-800 transition ease-in-out duration-300 focus:outline-none focus:ring-0 border-0"
          >
            Tambah Sub Menu
          </Link>
          <table className="table border-border-gray-100">
            <thead>
              <tr>
                <th className="text-gray-200">Title</th>
                <th className="text-gray-200">Route</th>
              </tr>
            </thead>
            <tbody>
              {menus
                ?.filter((menu) => menu.parentId == menuId)
                .map((menu) => {
                  return (
                    <tr key={menu.id}>
                      <td className="text-gray-200">{menu.title}</td>
                      <td className="text-gray-200">{menu.href ?? "#"}</td>
                      <td>
                        <Link
                          href={`/admin/menu/${menu.parentId}/sub-menu/${menu.id}`}
                          className="btn btn-success btn-sm text-gray-200 hover:shadow-md mx-2 my-2"
                        >
                          Detail
                        </Link>
                        <Link
                          href={`/admin/menu/${menu.parentId}/sub-menu/edit/${menu.id}`}
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
  );
}
