export enum FileWorkerCommands {
  ReadFile = "readFile",
}

export interface FileWorkerControls{
  [FileWorkerCommands.ReadFile]: (file: File) => Promise<string>
}