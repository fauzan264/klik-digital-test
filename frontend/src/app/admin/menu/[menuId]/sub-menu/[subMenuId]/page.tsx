"use client";
import { useParams } from "next/navigation";
import useMenuStore from "@/store/useMenuStore";

export default function SubMenuDetailPage() {
  const { subMenuId } = useParams<{
    menuId: string;
    subMenuId: string;
  }>();
  const { getMenuById, menus } = useMenuStore();
  const detailMenu = getMenuById(subMenuId);

  return (
    <div className="mx-auto w-11/12 my-10">
      <h1 className="text-2xl text-gray-700">Detail Sub Menu</h1>
      <div className="card bg-teal-700 my-5">
        <div className="card-body">
          <div className="flex justify-between items-start p-6 flex-col md:flex-row-reverse">
            <div className="w-full">
              <h1 className="text-xl text-gray-200 font-semibold pb-5">
                Sub Menu Info
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
    </div>
  );
}
