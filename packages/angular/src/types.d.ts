declare module '@angular/core' {
  export function Component(opts: Record<string, unknown>): ClassDecorator;
  export function Inject(token: unknown): ParameterDecorator;
  export function Input(): PropertyDecorator;
  export function Output(): PropertyDecorator;
  export const PLATFORM_ID: unique symbol;
  export class EventEmitter<T> {
    emit(value: T): void;
    subscribe(fn: (value: T) => void): void;
  }
  export interface OnInit { ngOnInit(): void; }
  export interface OnDestroy { ngOnDestroy(): void; }
}

declare module '@angular/common' {
  export function isPlatformBrowser(platformId: unknown): boolean;
}
