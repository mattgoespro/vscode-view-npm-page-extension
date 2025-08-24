import { window } from "vscode";
import path from "path";

export const outputPanel = window.createOutputChannel("View NPM Page");

if (process.env.NODE_ENV === "development") {
  outputPanel.show();
}

export function getSelectionModuleName() {
  const editor = window.activeTextEditor;

  if (editor == null) {
    outputPanel.appendLine("No active editors.");
    return;
  }

  const activeDocument = editor.document;
  const selectImportRange = activeDocument.getWordRangeAtPosition(
    window.activeTextEditor.selection.active,
    /"([^"]+)"/
  );

  if (selectImportRange == null) {
    outputPanel.appendLine("Error: No module found at target import location.");
    return;
  }

  const importName = activeDocument
    .getText(selectImportRange)
    .replaceAll('"', "");

  if (isBuiltinModule(importName)) {
    outputPanel.appendLine(`Info: ${importName} is a built-in module.`);
    return importName.split(":")[1];
  }

  return importName;
}

function isBuiltinModule(moduleName: string): boolean {
  return moduleName.startsWith("node:");
}

export function isLocalModuleImport(moduleName: string): boolean {
  return path.isAbsolute(moduleName);
}
