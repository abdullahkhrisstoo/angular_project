import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.timepicker();
  }

  timepicker() {
    const createCircleOfDivs = (num: number, radius: number, offsetX: number, offsetY: number, className: string, add: number, teilbar: number) => {
      let x, y;
      for (let n = 0; n < num; n++) {
        x = radius * Math.cos(n / num * 2 * Math.PI);
        y = radius * Math.sin(n / num * 2 * Math.PI);
        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, className);
        if (teilbar === 1) {
          if (n + 3 > 12) {
            div.textContent = (n + 3 - 12 + add).toString();
          } else {
            div.textContent = (n + 3 + add).toString();
          }
        } else {
          if (n % teilbar === 0) {
            if (n + 15 >= 60) {
              this.renderer.setAttribute(div, 'data-value', (n + 15 - 60).toString());
              div.textContent = (n + 15 - 60 + add).toString();
            } else {
              this.renderer.setAttribute(div, 'data-value', (n + 15).toString());
              div.textContent = (n + 15 + add).toString();
            }
          } else {
            if (n + 15 >= 60) {
              this.renderer.setAttribute(div, 'data-value', (n + 15 - 60).toString());
              div.textContent = '⋅';
            } else {
              this.renderer.setAttribute(div, 'data-value', (n + 15).toString());
              div.textContent = '⋅';
            }
          }
        }

        this.renderer.setStyle(div, 'left', `${x + offsetX}px`);
        this.renderer.setStyle(div, 'top', `${y + offsetY}px`);
        this.el.nativeElement.querySelector('.circle').appendChild(div);
      }
    };

    const currentTime = new Date();

    const setHandRotation = (handClass: string, degree: number) => {
      const hand = this.el.nativeElement.querySelector(handClass) as HTMLElement;
      this.renderer.setStyle(hand, 'transform', `rotate(${degree}deg)`);
    };

    const selectHours = () => {
      this.el.nativeElement.querySelector('.circle').innerHTML = '<div class="mid"></div><div class="hand hour-hand"></div><div class="hand minute-hand"></div>';
      createCircleOfDivs(12, 101, 105, 105, 'hour', 0, 1);
      createCircleOfDivs(12, 64, 110, 110, 'hour2', 12, 1);
      this.el.nativeElement.querySelector('.top .active')?.classList.remove('active');
      this.el.nativeElement.querySelector('.top .h')?.classList.add('active');

      Array.from(this.el.nativeElement.querySelectorAll('.hour, .hour2')).forEach((element) => {
        const hourElement = element as HTMLElement;
        hourElement.addEventListener('mouseup', () => {
          const hour = parseInt(hourElement.textContent!, 10);
          this.el.nativeElement.querySelector('.top .h').textContent = hourElement.textContent!.length > 1 ? hourElement.textContent : '0' + hourElement.textContent;
          setHandRotation('.hour-hand', (hour % 12) * 30); // 360 / 12 = 30
          selectMinutes();
        });
      });
    };

    const selectMinutes = () => {
      this.el.nativeElement.querySelector('.circle').innerHTML = '<div class="mid"></div><div class="hand hour-hand"></div><div class="hand minute-hand"></div>';
      this.el.nativeElement.querySelector('.top .active')?.classList.remove('active');
      this.el.nativeElement.querySelector('.top .m')?.classList.add('active');
      createCircleOfDivs(60, 101, 115, 115, 'min', 0, 5);

      Array.from(this.el.nativeElement.querySelectorAll('.min')).forEach((element) => {
        const minElement = element as HTMLElement;
        minElement.addEventListener('mouseup', () => {
          const dataValue = minElement.getAttribute('data-value');
          this.el.nativeElement.querySelector('.top .m').textContent = dataValue!.length > 1 ? dataValue : '0' + dataValue;
          setHandRotation('.minute-hand', parseInt(dataValue!, 10) * 6); // 360 / 60 = 6
        });
      });
    };

    selectHours();
    this.el.nativeElement.querySelector('.top .h').textContent = currentTime.getHours().toString();
    this.el.nativeElement.querySelector('.top .m').textContent = currentTime.getMinutes().toString();
    setHandRotation('.hour-hand', (currentTime.getHours() % 12) * 30);
    setHandRotation('.minute-hand', currentTime.getMinutes() * 6);

    Array.from(this.el.nativeElement.querySelectorAll('.top span')).forEach((element) => {
      const spanElement = element as HTMLElement;
      spanElement.addEventListener('click', () => {
        if (!spanElement.classList.contains('active')) {
          if (spanElement.classList.contains('h')) {
            selectHours();
          } else {
            selectMinutes();
          }
        }
      });
    });

    (this.el.nativeElement.querySelector('.action.ok') as HTMLElement).addEventListener('click', () => {
      const selectedTime = this.el.nativeElement.querySelector('.top .h').textContent + ':' + this.el.nativeElement.querySelector('.top .m').textContent;
      alert(selectedTime);
    });

    (this.el.nativeElement.querySelector('.action.cancel') as HTMLElement).addEventListener('click', () => {
      // Cancel action
    });
  }
}
