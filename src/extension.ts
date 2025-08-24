import { commands, ExtensionContext } from "vscode";
import { openInNpmCommand } from "./commands";

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand(
    "extension.openInNpm",
    openInNpmCommand
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
