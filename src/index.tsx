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

import { Props, Component, Options } from "./types"

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

    function createComponent<O extends Options>(
      render: (props: Props<O>) => JSX.Element | null,
    ) {
      const Role = (props: Props<O>, ref: React.Ref<any>) =>
        render({ ref, ...props })
      return React.forwardRef(Role) as unknown as Component<O>
    }

    type ComponentProps = Omit<VariantProps<typeof classes>, "class"> & {
      as?: T
      className?: string
    }
    const Component = createComponent<ComponentProps>((props) => {
      let _props = Object.assign({}, props) as typeof props

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

      let Comp = Tag as any

      if (_props.as) {
        Comp = _props.as
        delete _props.as
      }

      return <Comp {..._props} />
    })

    return Component
  }
}
