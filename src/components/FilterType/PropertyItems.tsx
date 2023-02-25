import {
  HomeIcon,
  OfficeBuildingIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/outline";

const iconClass = "w-6 h-6";
export const PropertyItems = [
  {
    label: "Home",
    icon: <HomeIcon className={iconClass} />,
  },
  {
    label: "Apartment",
    icon: <OfficeBuildingIcon className={iconClass} />,
  },
  {
    label: "GuestHouse",
    icon: <PresentationChartBarIcon className={iconClass} />,
  },
  {
    label: "Hotel",
    icon: <OfficeBuildingIcon className={iconClass} />,
  },
];
