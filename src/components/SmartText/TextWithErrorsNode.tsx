import {NodeKey, TextNode, SerializedTextNode, $applyNodeReplacement, EditorConfig, Spread} from 'lexical';

export type SerializedTextWithErrorsNode = Spread<{ errors: unknown[] }, SerializedTextNode>;

const TYPE = 'text-with-errors'

export class TextWithErrorsNode extends TextNode {
  constructor(text: string, errors?: unknown, key?: NodeKey) {
    super(text, key);
    if (errors) {
      this.__errors = errors
    }
  }

  static getType() {
    return TYPE
  }
  
  static clone(node: TextWithErrorsNode): TextWithErrorsNode {
    return new TextWithErrorsNode(node.__text, node.__key);
  }
  
  static importJSON(serializedNode: SerializedTextWithErrorsNode): TextWithErrorsNode {
    const node = $createTextWithErrorsNode(
      serializedNode.text,
      serializedNode.errors
    );
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }
  
  createDOM(config: EditorConfig): HTMLElement {
    const html = super.createDOM(config);
    console.log(this.__errors)
    console.log('html', html);
    return html;
  }

  updateDOM(
    prevNode: TextNode,
    dom: HTMLElement,
    config: EditorConfig,
  ): boolean {
    const inner = dom.firstChild;
    console.log('inner', inner)
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner as HTMLElement, config);
    return false;
  }

  exportJSON(): SerializedTextWithErrorsNode {
    return {
      ...super.exportJSON(),
      type: TYPE,
      errors: this.__errors
    };
  }
  
}

export function $createTextWithErrorsNode(
  text: string,
  errors?: unknown,
): TextWithErrorsNode {
  const node = new TextWithErrorsNode(text, errors);
  return $applyNodeReplacement(node);
}
