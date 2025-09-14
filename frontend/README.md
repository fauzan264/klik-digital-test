---
# Klik Digital Test

## Description

A menu management application built with **Next.js**, using **Zustand** for state management and **DaisyUI/TailwindCSS** for UI.
You can **create, read, update, and delete menus and sub-menus**.
---

## How to Run the Project

1. **Clone the repository**

```bash
git clone https://github.com/fauzan264/klik-digital-test.git
cd klik-digital-test/frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## Assumptions / Notes

- **Menu State**: Menus are stored on the client-side using Zustand. There is no backend; data will reset on page reload.
- **Menu ID**: Each menu has a unique `id`. Default menus use fixed IDs; new menus use `nanoid` for unique IDs.
- **Parent-Child Relation**: Menus with a non-null `parentId` are sub-menus of the corresponding parent menu.
- **Authentication**: Login uses **hardcoded credentials**:

  - **Username**: `admin`
  - **Password**: `pass123`

- **UI Components**: Modals and other UI elements use DaisyUI.

---

## Try the Demo

You can try the live demo here:

[https://klik-digital-test.vercel.app/](https://klik-digital-test.vercel.app/)

Use the **hardcoded login credentials** to access the app.
