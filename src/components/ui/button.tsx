import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-calm-lg font-semibold transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90 shadow-calm",
        accent: "bg-accent text-accent-foreground hover:opacity-90 shadow-calm",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
        ghost: "hover:bg-primary/10 text-foreground",
        destructive: "bg-red-500 text-white hover:opacity-90",
        secondary: "bg-card text-foreground border border-border hover:bg-primary/5",
      },
      size: {
        default: "min-h-touch px-6 py-3 text-lg",
        sm: "min-h-12 px-4 py-2 text-base",
        lg: "min-h-touch-lg px-8 py-4 text-xl",
        icon: "h-touch w-touch p-0",
        pictogram: "h-auto w-full flex-col gap-2 p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
