"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

interface ProfilePopoverProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
}

export default function ProfilePopover({ title, children, onClose }: ProfilePopoverProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-start justify-center overflow-y-auto">
      <div className="w-full min-h-screen">
        <Navbar />
        <div className="w-full bg-mira-green rounded-t-3xl flex-1 min-h-[calc(100vh-64px)]">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold font-halogen tracking-wide uppercase">{title}</h2>
            <Link href="/" className="p-1 hover:text-gray-700">
              <X size={24} className="text-black" />
            </Link>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
