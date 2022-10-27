import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { githubDark } from "@uiw/codemirror-theme-github";
import { stex } from "@codemirror/legacy-modes/mode/stex";

export default function EditorGen() {
  return (
    <div id="codeMirrorContainer">
      <CodeMirror
        value="\document{test}"
        theme={githubDark}
        height="200px"
        extensions={[StreamLanguage.define(stex)]}
      />
    </div>
  );
}
