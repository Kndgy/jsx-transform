<div align="center">

# jsx-transform-json

Convert React components to JSON and the other way around, compatible with react typescript

</div>

<table><tr><td>

```js
CreateJsx(
    <div className='div-class'>
        <span style={{color:'black'}} className='span-class'>
            this is text
        </span>
    </div>
)
```

</td><td>⇄</td><td>

```js
CreateJSON({
    type: "div",
    props: {
        className: "div-class",
        style: {},
        children: [
            {
                type: "span",
                key: null,
                ref: null,
                props: {
                    className: "span-class",
                    style: {
                        color: "black"
                    },
                    children: [
                        "this is text"
                    ]
                }
            }
        ]
    },
    key: null,
    ref: null
})
```

</td></tr></table>

<div align="left">

## Supported properties

</div>

```ts
interface NodeJson {
    type: string | Function;
    key?: string | number | null;
    ref?: any;
    props: {
      className: string;
      style?: any;
      children: Array<NodeJson | string>;
    };
  }
```

## Install

```
npm i jsx-transform-json
```