"use client";
import useMenuStore from "@/store/useMenuStore";
import { useEffect } from "react";

export default function AdminPage() {
  const { menus, addMenu } = useMenuStore();

  const createMenu = ({
    title,
    href,
    parentId,
  }: {
    title: string;
    href: string | null;
    parentId: string | null;
  }) => {
    addMenu({ title, href, parentId });
  };

  return <></>;
}
