import * as React from "react"
import { cva, cx } from "class-variance-authority"
import type {
  VariantProps,
  ClassProp,
  VariantsSchema,
  VariantsConfig,
  ClassValue,
} from "class-variance-authority"

export { VariantProps, ClassProp, VariantsSchema, VariantsConfig, ClassValue }

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements

type VariantOBJ<Variants> =
  | (Variants extends VariantsSchema
      ? VariantsConfig<Variants> & ClassProp
      : ClassProp)
  | undefined

export function styled<T extends IntrinsicElementsKeys>(Tag: T) {
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
      ref?: any,
    ) {
      // Grab a shallow copy of the props
      let _props = Object.assign({}, props)

      if (config && config.variants) {
        const keys = Object.keys(config.variants)
        let _variants: VariantOBJ<typeof config.variants> = {
          class: props.className,
        }
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index]
          if (_props[key] !== undefined) {
            _variants[key] = _props[key]
            delete _props[key]
          }
        }

        _props.className = cx(classes(_variants as any))
      } else {
        _props.className = cx(classes(), props.className)
      }

      if (ref) {
        _props.ref = ref
      }

      let _as = Tag

      return React.createElement(_as, _props)
    }

    return React.forwardRef(StyledWrapper)
  }
}
