import React from "react";
import { IDiploma } from "../types/diploma";
import Image from "next/image";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { Link } from "@/i18n/navigation";

interface IDiplomaItemProps {
  diploma: IDiploma;
}
export default function DiplomaItem({ diploma }: IDiplomaItemProps) {
  return (
    <Link href={`/exams?diplomaId=${diploma.id}`}
      className={cn(
        "min-h-96 p-2.5 flex flex-col justify-end relative",
        !diploma.image && "bg-blue-50",
      )}
    >
      {/*image*/}
      {diploma.image && (
        <Image
          src={diploma.image}
          alt={diploma.title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 90vw, 400px"
        />
      )}

      {/*content*/}
      <div className="space-y-1 max-h-24.5 hover:max-h-69.5 overflow-y-hidden transition-all duration-500   absolute bottom-2.5 left-2.5 right-2.5 bg-blue-600/75 text-white p-4">
        {/*title*/}
        <p className="text-xl font-semibold">{diploma.title}</p>

        {/*description*/}
        <p className="text-sm  transition-all  ">
          {diploma.description}
        </p>
      </div>
    </Link>
  );
}
