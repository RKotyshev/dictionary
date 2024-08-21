import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { ContextWithActive } from '../core/interfaces/polymorpheus-context';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent<T> {
  @Input()
  public items: ReadonlyArray<T> = [];

  @Input()
  public emptyContent: PolymorpheusContent<never> = 'Nothing is found';

  @Input()
  public content: PolymorpheusContent<ContextWithActive<T>> = (
    { $implicit }: ContextWithActive<T>,
  ) => String($implicit);

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this._activeItem = null;
  }

  @Output()
  public readonly itemClicked = new EventEmitter<T>();

  private _activeItem: T | null = null;

  public isActive(item: T): boolean {
    return item === this._activeItem;
  }

  public onMouseEnter(item: T): void {
    this._activeItem = item;
  }

  public getContext($implicit: T): ContextWithActive<T> {
    return {
      $implicit,
      active: this.isActive($implicit),
    }
  }
}
