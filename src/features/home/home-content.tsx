"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid, Pencil, BookOpen, Settings, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/utils/constants";

const mainActions = [
  {
    href: ROUTES.board,
    label: "لوحة التواصل",
    description: "(ثابتة)",
    icon: LayoutGrid,
    color: "bg-[#F99C16]",
  },
  {
    href: ROUTES.builder,
    label: "منشئ الجمل",
    description: "(بناء حر)",
    icon: Pencil,
    color: "bg-[#52B768]",
  },
  {
    href: ROUTES.library,
    label: "مكتبة الرموز",
    description: "",
    icon: BookOpen,
    color: "bg-[#3399FF]",
  },
  {
    href: ROUTES.history,
    label: "سجل التواصل",
    description: "",
    icon: History,
    color: "bg-[#9B26B6]",
  },
];

const settingsAction = {
  href: ROUTES.settings,
  label: "الإعدادات",
  icon: Settings,
  color: "bg-[#627D8C]",
};

export function HomeContent() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md sm:max-w-2xl">
      <section className="mb-10 text-center" aria-labelledby="hero-title">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 id="hero-title" className="text-4xl font-bold text-[#4CAF50] sm:text-5xl leading-tight">
            تطبيق بيكس للأطفال
            <br />
            (PECS)
          </h1>
        </motion.div>
      </section>

      <section aria-labelledby="actions-title">
        <h2 id="actions-title" className="sr-only">
          الإجراءات الرئيسية
        </h2>
        <div className="grid gap-4 grid-cols-2 mb-4">
          {mainActions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={action.href} className="block h-full">
                <Card className={`h-full transition-shadow duration-300 hover:shadow-calm-lg border-0 ${action.color} text-white rounded-2xl`}>
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[160px]">
                    <action.icon className="h-10 w-10 mb-3" strokeWidth={2.5} aria-hidden />
                    <div>
                      <h3 className="text-xl font-bold">{action.label}</h3>
                      {action.description && (
                        <p className="mt-1 text-lg font-medium opacity-90">{action.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: mainActions.length * 0.08 }}
        >
          <Link href={settingsAction.href} className="block w-full">
            <Card className={`w-full transition-shadow duration-300 hover:shadow-calm-lg border-0 ${settingsAction.color} text-white rounded-2xl`}>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[120px]">
                <settingsAction.icon className="h-10 w-10 mb-3" strokeWidth={2.5} aria-hidden />
                <h3 className="text-xl font-bold">{settingsAction.label}</h3>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
