import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-navy-900 text-white shadow",
        secondary:
          "border-transparent bg-slate-100 text-navy-800",
        destructive:
          "border-transparent bg-brandRed-600 text-white shadow",
        outline: "text-navy-900 border-slate-300",
        emergency: "border-brandRed-200 bg-brandRed-50 text-brandRed-700 font-bold",
        copper: "border-copper-200 bg-copper-50 text-copper-700 font-mono text-[11px]",
        aqua: "border-aqua-200 bg-aqua-50 text-aqua-600 font-medium",
        success: "border-emerald-200 bg-emerald-50 text-emerald-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

