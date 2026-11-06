import LanguageSwitcher from "@/shared/components/language-switcher";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";

export default function AuthSideLayout() {
  //variables
  const features = [
    {
      icon: Brain,
      title: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
      icon: BookOpenCheck,
      title: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
      icon: RectangleEllipsis,
      title: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
  ];
  return (
    <aside
      className={cn(
        "relative overflow-hidden p-16 flex items-center justify-center",
        "before:absolute before:top-24 before:-right-16 before:bg-blue-200 before:size-80 before:rounded-full before:blur-3xl before:-z-10",
        "after:absolute after:-bottom-24 after:-left-16 after:bg-blue-200 after:size-80 after:rounded-full after:blur-3xl after:-z-10",
      )}
    >
      <div className="max-h-160 h-full max-w-120 flex flex-col justify-between z-10">
        <header className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          {/*logo*/}
          <FolderCode className="size-8" />
          {/*title*/}
          Exam App 
          {/*language switcher*/}
          <LanguageSwitcher className="ms-auto"/>
        </header>

        {/*content*/}
        <div className="h-120 flex flex-col justify-between ">
          {/*title*/}
          <p className="text-3xl font-bold text-gray-800 font-inter">
            Empower your learning journey with our smart exam platform.
          </p>

          {/*features*/}
          <ul className="space-y-9">
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-5">
                {/*icon*/}
                <span className="border-2 border-blue-600 text-blue-600 size-9 flex items-center justify-center shrink-0">
                  <feature.icon className="size-6" />
                </span>

                {/*content*/}
                <div className="space-y-2.5">
                  {/*title*/}
                  <p className="text-xl font-semibold text-blue-600">
                    {feature.title}
                  </p>

                  {/*description*/}
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
