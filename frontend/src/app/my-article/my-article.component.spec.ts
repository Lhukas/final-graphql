import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArticleComponent } from './my-article.component';

describe('MyArticleComponent', () => {
  let component: MyArticleComponent;
  let fixture: ComponentFixture<MyArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyArticleComponent]
    });
    fixture = TestBed.createComponent(MyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
