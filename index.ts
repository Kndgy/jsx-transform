import React from "react";

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
  
  export function restructureJSON(obj: NodeJson | Array<NodeJson>): NodeJson {
    let newNode: NodeJson = {
      type: '',
      props: {
        className: '',
        style: {},
        children: []
      }
    }
    function recurse(obj: NodeJson | Array<NodeJson>, newNode: NodeJson) {
      if (Array.isArray(obj)) {
        obj.forEach(item => recurse(item, newNode))
      } else {
        if (obj.hasOwnProperty("type")) {
          newNode.type = obj.type;
        }
        if (obj.hasOwnProperty("key")) {
          newNode.key = obj.key;
        }
        if (obj.hasOwnProperty("ref")) {
          newNode.ref = obj.ref;
        }
        if (obj.hasOwnProperty("props")) {
          if (obj.props.hasOwnProperty("className")) {
            newNode.props.className = obj.props.className;
          }
          if (obj.props.hasOwnProperty("style")) {
              newNode.props.style = obj.props.style;
          }
          if (obj.props.hasOwnProperty("children")) {
            if (Array.isArray(obj.props.children)) {
              obj.props.children.forEach((child: NodeJson | string) => {
                if (typeof child === 'string') {
                  newNode.props.children.push(child);
                } else {
                  let newChild = {
                    type: '',
                    key: '',
                    ref: '',
                    props: {
                      className: '',
                      style: {},
                      children: []
                    }
                  }
                  recurse(child, newChild);
                  newNode.props.children.push(newChild);
                }
              });
            } else if (typeof obj.props.children === 'string') {
              newNode.props.children.push(obj.props.children);
            } else {
              let newChild = {
                type: '',
                key: '',
                ref: '',
                props: {
                  className: '',
                  style: {},
                  children: []
                }
              }
              recurse(obj.props.children, newChild);
              newNode.props.children.push(newChild);
            }
          }
        }
      }
    }
    recurse(obj, newNode);
    return newNode;
  }
  
  export function CreateJsx(el:any){
    type JsonType = {
        type?: string;
        props: {
          [key: string]: any;
          children?: JsonType[] | string[];
        };
      };
      
    function createReactElementFromJson(json: JsonType): React.ReactNode {
        const { type, props } = json;
        
        const children = props.children || [];
        
        const childElements = children.map(child => {
            if (typeof child === 'string') {
            return child;
            } else {
            return createReactElementFromJson(child);
            }
        });
        
        return React.createElement(
            type!,
            props,
            ...childElements
        );
    }
      
    return createReactElementFromJson(el)
}