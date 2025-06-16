import React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Profile from "./Profile";
import Message from "./Message";
import Notification from "./Notification";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useDispatch, useSelector } from "react-redux";
import { HeaderToggle } from "../../redux/slice/HeaderSlice";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headToggle = useSelector((state: any) => state.header.head);
  const dispatch = useDispatch();


  return (
    <header className="bg-white sticky top-0 z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between px-6 py-4 lg:px-8"
      >
        {/* <div className="flex lg:flex-1">
          <button onClick={() => dispatch(HeaderToggle())}>
            <MenuOutlinedIcon className="text-slate-500" />
          </button>
        </div> */}
        {/* <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <MoreHorizIcon aria-hidden="true" className="size-6" />
          </button>
        </div> */}

        <div className=" flex items-center gap-x-6 flex-1 justify-end">
          {/* <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
          {/* <Notification />
          <Message /> */}
          {/* <Profile /> */}
        </div>
      </nav>
    
    </header>
  );
}
