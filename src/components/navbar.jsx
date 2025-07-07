import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "./ui/navigation-menu"
import { Link } from "@radix-ui/react-navigation-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const [active, setActive] = useState("")

  return (
    <div className="w-full flex justify-center bg-[#002855] text-white">
      <NavigationMenu value={active} onValueChange={setActive}>
        <NavigationMenuList className="m-4 flex flex-wrap items-center gap-4">

          {/* Logo */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="#">
                <img src="/gif/logo.gif" alt="Logo" className="h-10" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className={navigationMenuTriggerStyle()} href="#">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Activities */}
          <NavigationMenuItem value="activities">
            <NavigationMenuTrigger>Activities</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="space-y-2 p-4 min-w-[200px]">
                {["Events", "News", "Achievements"].map(item => (
                  <li key={item}>
                    <NavigationMenuLink asChild>
                      <Link href="#">{item}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Societies & AG */}
          <NavigationMenuItem value="societies">
            <NavigationMenuTrigger>Societies & AG</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="space-y-2 p-4 min-w-[200px]">
                {[
                  "IEEE NSU PES SBC",
                  "IEEE NSU RAS SBC",
                  "IEEE NSU IAS SBC",
                  "IEEE NSU WIE AG"
                ].map(item => (
                  <li key={item}>
                    <NavigationMenuLink asChild>
                      <Link href="#">{item}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Members with Teams Submenu */}
          <NavigationMenuItem value="members">
            <NavigationMenuTrigger>Members</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4 space-y-2 min-w-[240px]">
                {["Panels", "Officers", "Volunteers"].map(item => (
                  <li key={item}>
                    <NavigationMenuLink asChild>
                      <Link href="#">{item}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}

                {/* Teams Submenu */}
                <li className="relative group">
                  <div className="font-semibold cursor-pointer">Teams ▸</div>
                  <ul className="absolute left-full top-0 ml-2 hidden group-hover:block bg-[#002855] p-2 rounded-md shadow-md min-w-[240px] z-10 space-y-1">
                    {[
                      "Content Writing & Publications",
                      "Website Development",
                      "Media",
                      "Events and Management",
                      "Graphics",
                      "Public Relation",
                      "Promotions",
                      "Finance & Corporate",
                      "Logistics & Operations",
                      "Membership Development"
                    ].map(team => (
                      <li key={team}>
                        <NavigationMenuLink asChild>
                          <Link href="#">{team}</Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </li>

                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">Exemplary Members</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">All Members & Statistics</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Other Items */}
          {[
            ["About", "About Us"],
            ["Publications", "All Publications"],
            ["Contact", "Contact Us"],
            ["Get Involved", "Join Us"]
          ].map(([label, text]) => (
            <NavigationMenuItem key={label} value={label.toLowerCase()}>
              <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="#">{text}</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

          {/* Portal Button */}
          <NavigationMenuItem>
            <Button className="bg-[#00629B] border-[#6fa8c9] border-2 text-white px-3 text-xs hover:bg-[#00629B]">
              IEEE NSU SB Portal
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Navbar
