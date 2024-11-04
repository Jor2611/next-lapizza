import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { CartButton, Container, SearchInput } from "./";
import { Button } from "../ui";
import { User } from "lucide-react";

type Props = {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart= true, className }) => {
  return (
    <header className={cn("", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src={logo} alt="logo" width={35} height={35}/>
            <div>
              <h1 className="text-2xl uppercase font-black">LaPizza</h1>
              <p className="text-sm text-gray-400 leading-3">Tasty Food</p>
            </div>
          </div>
        </Link>

          {hasSearch && (
            <div className="mx-10 flex-1">
              <SearchInput/>
            </div>
          )}
        

        <div className="flex items-center gap-3">
          <Button variant={"outline"} className="flex items-center gap-1">
            <User size={10}/> Sign In
          </Button>
          {hasCart && <CartButton/>}
        </div>
      </Container>
    </header>
  )
}