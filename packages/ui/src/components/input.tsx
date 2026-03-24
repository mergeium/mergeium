import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { EyeIcon, EyeSlashIcon, CopyIcon, CheckIcon } from "@phosphor-icons/react";

import { cn } from "@mergeium/ui/lib/utils";

const inputVariants = cva(
  "w-full min-w-0 rounded-lg text-base transition-colors outline-none placeholder:text-muted-foreground/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-transparent focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80",
        secondary:
          "border-0 bg-muted focus-visible:ring-0",
      },
      size: {
        default: "h-8 px-2.5 py-1",
        xs: "h-6 px-2 text-xs",
        sm: "h-7 px-2.5 text-[0.8rem]",
        lg: "h-9 px-2.5",
        xl: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    copyable?: boolean;
  };

function Input({
  className,
  type,
  variant = "default",
  size = "default",
  copyable = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const isPassword = type === "password";
  const hasSuffix = isPassword || copyable;

  const suffixAction = isPassword
    ? { onClick: () => setShowPassword((v) => !v), label: showPassword ? "Hide password" : "Show password" }
    : copyable
      ? {
          onClick: () => {
            navigator.clipboard.writeText(String(props.value ?? props.defaultValue ?? "")).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          },
          label: "Copy",
        }
      : null;

  const suffixIcon = isPassword
    ? showPassword ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />
    : copied ? <CheckIcon className="size-5" /> : <CopyIcon className="size-5" />;

  const inputEl = (
    <input
      type={isPassword && showPassword ? "text" : type}
      data-slot="input"
      className={cn(
        inputVariants({ variant, size }),
        hasSuffix && "pr-10",
        !hasSuffix && "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className
      )}
      {...props}
    />
  );

  if (!suffixAction) return inputEl;

  return (
    <div className="relative w-full">
      {inputEl}
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-muted-foreground hover:text-foreground"
        onClick={suffixAction.onClick}
        aria-label={suffixAction.label}
      >
        {suffixIcon}
      </button>
    </div>
  );
}

export { Input, inputVariants };