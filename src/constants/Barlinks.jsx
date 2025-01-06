import { Home, Wallpaper, Users, Bookmark, ImagePlus } from "lucide-react";


export const sidebarLinks = [
  {
    icon: <Home size={20} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <Wallpaper size={20} />,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: <Users size={20} />,
    route: "/all-users",
    label: "People",
  },
  {
    icon: <Bookmark size={20} />,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: <ImagePlus size={20} />,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    icon: <Home size={20} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <Wallpaper size={20} />,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: <Bookmark size={20} />,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: <ImagePlus size={20} />,
    route: "/create-post",
    label: "Create",
  },
];
