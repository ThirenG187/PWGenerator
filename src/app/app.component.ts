import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type letters = 'letters';
type numbers = 'numbers';
type symbols = 'symbols';
type FieldType = letters | numbers | symbols | undefined;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pwgenerator';
  length: number | null | undefined = null;
  password: string = '';
  includeLetters: boolean = false;
  includeNumbers: boolean = false;
  includeSymbols: boolean = false;
  fieldType: FieldType;

  public onChangeInclusion(type: FieldType): void {
    switch (type) {
      case 'letters':
        this.includeLetters = !this.includeLetters;
        break;
      case 'numbers':
        this.includeNumbers = !this.includeNumbers;
        break;
      case 'symbols':
        this.includeSymbols = !this.includeSymbols;
        break;
      case undefined:
        break;
    }
  }

  public onChangeLength(event: any): void {
    const parsed = parseInt(event.target.value);

    if (!isNaN(parsed)) {
      this.length = parsed;
    } else {
      this.length = null;
    }
  }

  public onButtonClick(): void {
    const numbers = '1234567890';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%&';

    let validChars = '';

    if (this.includeLetters) {
      validChars += letters;
    }

    if (this.includeNumbers) {
      validChars += numbers;
    }

    if (this.includeSymbols) {
      validChars += symbols;
    }

    let generatedPassword = '';

    if (this.length === null || this.length === undefined) return;

    for (let i = 0; i < this.length; i++) {
      const capitalize = !Math.round(Math.random());
      const index = Math.floor(Math.random() * validChars.length);

      generatedPassword += capitalize
        ? (validChars[index] as string).toUpperCase()
        : validChars[index];
    }

    this.password = generatedPassword;
  }

  public checkDisabled() {
    if (
      !this.length ||
      !this.includeSymbols ||
      !this.includeLetters ||
      !this.includeSymbols
    ) {
      return true;
    }

    return false;
  }
}
