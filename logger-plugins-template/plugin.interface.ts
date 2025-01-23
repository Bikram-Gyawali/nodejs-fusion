export interface Plugin {
  name: string;
  version: string;
  initialize?: () => Promise<void>;
  shutdown?: () => Promise<void>;
  hooks: {
    [key: string]: (...args: any[]) => Promise<any>;
  };
}