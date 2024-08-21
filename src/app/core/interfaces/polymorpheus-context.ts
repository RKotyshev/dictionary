export interface ContextWithImplicit<T> {
  readonly $implicit: T;
}

export interface ContextWithActive<T> extends ContextWithImplicit<T> {
  readonly active: boolean;
}