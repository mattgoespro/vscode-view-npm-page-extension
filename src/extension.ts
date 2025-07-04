import vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.openInNpm",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const position = editor.selection.active;
      const line = document.lineAt(position.line);
      const text = line.text.trim();

      // ✅ Match both CommonJS and ES Module imports
      const importRegex =
        /^(import\s+[\w*{}\s,]+from\s+['"])([^'"]+)(['"];?|;)$|^(const\s+[\w*{}\s,]+=\s*require\(['"])([^'"]+)(['"]\);?)$/;

      // ✅ Check if the line contains an import statement
      if (!importRegex.test(text)) {
        vscode.window.showInformationMessage(
          "No import statement found on this line."
        );
        return;
      }

      try {
        const open = await import("open");

        await open.openApp(open.apps.browser, {
          arguments: [
            `https://www.npmjs.com/package/${text.match(importRegex)?.[2] || text.match(importRegex)?.[4]}`,
          ],
        });
      } catch (error) {
        vscode.window.showErrorMessage(
          `Failed to open npm page: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
