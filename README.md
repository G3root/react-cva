<h1 align="center">react-cva</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/react-cva">
    <img alt="NPM Version" src="https://badgen.net/npm/v/react-cva" />
  </a>
  <a href="https://www.npmjs.com/package/react-cva">
    <img alt="Types Included" src="https://badgen.net/npm/types/react-cva" />
  </a>
  <a href="https://bundlephobia.com/result?p=react-cva">
    <img alt="Minizipped Size" src="https://img.shields.io/bundlephobia/minzip/react-cva" />
  </a>
  <a href="https://www.npmjs.com/package/react-cva">
    <img alt="NPM Downloads" src="https://badgen.net/npm/dm/react-cva" />
  </a>
  <a href="https://twitter.com/NFS__21">
    <img alt="Follow @NFS__21 on Twitter" src="https://img.shields.io/twitter/follow/NFS__21.svg?style=social&label=Follow" />
  </a>
</p>

## Introduction

this is a helper library for [cva](https://github.com/joe-bell/cva#readme) which this uses internally, for creating react components.
for more information view [cva docs](https://github.com/joe-bell/cva#readme).

## Acknowledgements

- [**Class Variance Authority**](https://github.com/joe-bell/cva) ([joe bell](https://github.com/joe-bell))

## Installation

```sh
npm i react-cva
```

## Examples

<details>
    <summary>without ref forwarding</summary>

```tsx
import { styled } from "react-cva";

const Button = styled("button")("test", {
  variants: {
    margin: { 0: "m-0", 2: "m-2", 4: "m-4", 8: "m-8" },
    padding: { 0: "p-0", 2: "p-2", 4: "p-4", 8: "p-8" },
  },
  defaultVariants: {
    margin: 0,
    padding: 0,
  },
});

const Render = () => {
  return (
    <div>
      <Button>test</Button>
    </div>
  );
};

```

</details>


<details>
    <summary>with ref forwarding</summary>

```tsx
import { styled } from "react-cva";
import { useRef } from "react";

const Button = styled("button", true)("test", {
  variants: {
    margin: { 0: "m-0", 2: "m-2", 4: "m-4", 8: "m-8" },
    padding: { 0: "p-0", 2: "p-2", 4: "p-4", 8: "p-8" },
  },
  defaultVariants: {
    margin: 0,
    padding: 0,
  },
});

const Render = () => {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <Button ref={ref}>test</Button>
    </div>
  );
};

```

</details>

<details>
    <summary>with tailwind css</summary>

```tsx
import { styled } from "react-cva";

const Button = styled("button", true)("button", {
  variants: {
    intent: {
      primary: [
        "bg-blue-500",
        "text-white",
        "border-transparent",
        "hover:bg-blue-600",
      ],
      secondary: [
        "bg-white",
        "text-gray-800",
        "border-gray-400",
        "hover:bg-gray-100",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

const Render = () => {
  return (
    <div>
      <Button intent="primary">test</Button>
    </div>
  );
};

```

</details>

<details>
    <summary>with css modules</summary>

```tsx
import { styled } from "react-cva";
import style from "./button.module.css";

const Button = styled("button", true)(style.base, {
  variants: {
    intent: {
      primary: style.primary,
      secondary: style.secondary,
    },
    size: {
      small: style.small,
      medium: style.medium,
    },
  },
  compoundVariants: [
    { intent: "primary", size: "medium", class: style.primaryMedium },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

const Render = () => {
  return (
    <div>
      <Button>test</Button>
    </div>
  );
};

```

</details>

## API Reference

### `styled`

Builds a `styled` component

```ts
const Component = styled("div",true)("base", options);
```

#### Parameters

1. `div`: tag type (`HtmlElement`)
2. `true` should forward prop (`boolean` or `undefined`)
3. `base`: the base class name (`string`, `string[]` or `null`)
4. `options` _(optional)_
   - `variants`: your variants schema
   - `compoundVariants`: variants based on a combination of previously defined variants
   - `defaultVariants`: set default values for previously defined variants

#### Returns

A JSX Element