import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/shared/lib/utils/tailwind-merge"
import { Button } from "./button"
import { EyeIcon, EyeOffIcon } from "lucide-react"


type InputProps = React.ComponentProps<typeof InputPrimitive>


const InputField = React.forwardRef<HTMLInputElement, InputProps>(
 ({ className, type, ...props }, ref) => {
     return (
    <InputPrimitive
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 border border-input bg-transparent px-2.5 py-3.5 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring  disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive  aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive",
        className
      )}
      {...props}
    />
  )
 }
)
InputField.displayName = "InputField"

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
 ({ className, type, ...props }, ref) => {
  //state
  const [showPassword, setShowPassword] = React.useState(false)
     return (
    <div className="relative">
      {/*input*/}
      <InputField
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={cn('pe-10', className)}
        {...props}
        autoComplete="current-password"
      />
      {/*toggle visibilty*/}
      <button type="button" className={"absolute inset-e-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors  text-muted hover:text-gray-600"}  onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
      </button>
    </div>
  )
 }
)
PasswordInput.displayName = "PasswordInput"



const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    if (type === "password") {
      return (
        <PasswordInput
          className={className}
          {...props}
          ref={ref}
        />
      )
    }

    return (
      <InputField
        className={className}
        type={type}
        {...props}
        ref={ref}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }

