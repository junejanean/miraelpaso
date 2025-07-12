"use client";

import Popover from "@/components/ui/popover";
import Link from "next/link";

export default function ContactPage() {
  return (
    <Popover title="CONTACT" backgroundColor="bg-mira-beige-light">
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="flex-1">
          <h2 className="font-halogen text-3xl font-bold leading-tight mb-8">
            Got a question, comment or just want to say hi?
          </h2>
          
          <p className="font-source-code text-sm">
            Please send us an email to{" "}
            <Link href="mailto:miraelpaso@gmail.com" className="underline">
              miraelpaso@gmail.com
            </Link>
          </p>
        </div>
        
        {/* Decorative Icon at the bottom */}
        <div className="flex justify-center pb-16">
          <img 
            src="/svgs/decorative_icons/Mira1.svg" 
            alt="Decorative icon" 
            width="80" 
            height="80" 
          />
        </div>
      </div>
    </Popover>
  );
}
