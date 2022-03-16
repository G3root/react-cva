import * as React from "react"
import { cva, cx } from "class-variance-authority"
import type {
  VariantProps,
  ClassValue,
  ClassProp,
  VariantsSchema,
  VariantsConfig,
} from "class-variance-authority"

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements

export function styled<T extends IntrinsicElementsKeys>(
  Tag: T,
  forwardRef?: boolean,
) {
  return function wrapper<Variants extends VariantsSchema>(
    base?: ClassValue,
    config?:
      | (Variants extends VariantsSchema
          ? {
              variants?: Variants | undefined
              defaultVariants?: VariantsConfig<Variants> | undefined
              compoundVariants?:
                | (Variants extends VariantsSchema
                    ? VariantsConfig<Variants> & ClassProp
                    : ClassProp)[]
                | undefined
            }
          : never)
      | undefined,
  ) {
    const classes = cva(base, config)

    function StyledWrapper(
      props: JSX.IntrinsicElements[typeof Tag] &
        Omit<VariantProps<typeof classes>, "class">,
      ref: any,
    ) {
      // Grab a shallow copy of the props
      let _props = Object.assign({}, props)
      props.className = cx(classes(), props.className)
      _props.ref = ref

      let _as = Tag

      return React.createElement(_as, _props)
    }

    return forwardRef ? React.forwardRef(StyledWrapper) : StyledWrapper
  }
}
