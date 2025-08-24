import { window, workspace } from "vscode";
import { apps, openApp } from "open";
import { getSelectionModuleName, outputPanel } from "./utils";

const settings = workspace.getConfiguration("viewNpmPage");

export async function openInNpmCommand() {
  const moduleName = getSelectionModuleName();

  if (moduleName == null) {
    outputPanel.appendLine(
      "Error: No module name found in selected import statement."
    );
    return;
  }

  outputPanel.appendLine(`Opening npm page for module: ${moduleName}`);

  let browserExecutable: string = settings.get("browserExecutable");

  if ((browserExecutable ?? "").length === 0) {
    browserExecutable = apps.browser as string;
  }

  try {
    await openApp(browserExecutable, {
      arguments: [`https://www.npmjs.com/package/${moduleName}`],
    });
  } catch (error) {
    window.showErrorMessage(
      `Failed to open npm page: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
