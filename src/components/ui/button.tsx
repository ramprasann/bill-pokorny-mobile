import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandRed-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] tap-press cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-navy-900 text-white shadow hover:bg-navy-800 active:bg-navy-950",
        emergency:
          "bg-brandRed-600 text-white shadow-float-btn hover:bg-brandRed-700 active:bg-brandRed-800 font-bold",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-navy-900",
        secondary:
          "bg-navy-50 text-navy-900 hover:bg-navy-100",
        ghost: "hover:bg-slate-100 hover:text-navy-900",
        link: "text-aqua-500 underline-offset-4 hover:underline",
        copper: "bg-copper-600 text-white shadow hover:bg-copper-700",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-13 rounded-2xl px-7 text-base font-bold",
        icon: "h-10 w-10 rounded-full",
        pill: "h-8 px-4 rounded-full text-xs font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

