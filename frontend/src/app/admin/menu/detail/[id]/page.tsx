"use client";
import { useParams } from "next/navigation";
import useMenuStore from "@/store/useMenuStore";

export default function MenuDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getMenuById, menus } = useMenuStore();
  const detailMenu = getMenuById(id);

  console.log(!detailMenu?.parentId);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-700">Detail Event</h1>
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
          <table className="table border-border-gray-100">
            <thead>
              <tr>
                <th className="text-gray-200">Title</th>
                <th className="text-gray-200">Route</th>
              </tr>
            </thead>
            <tbody>
              {detailMenu?.parentId != null &&
                menus
                  ?.filter((menu) => menu.parentId == detailMenu?.id)
                  .map((menu) => {
                    return (
                      <tr key={menu.id}>
                        <td className="text-gray-200">{menu.title}</td>
                        <td className="text-gray-200">{menu.href ?? "#"}</td>
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
