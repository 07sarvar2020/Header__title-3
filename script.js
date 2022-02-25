class SLIDER {
   constructor(obj) {
      this.slider = document.querySelector(obj.el);
      this.sliderBox = this.slider.querySelector('.slider__box');
      this.sliderItem = this.sliderBox.children;
      this.next = this.slider.querySelector('.slider__next');
      this.prev = this.slider.querySelector('.slider__prev');
      this.moveDirection = obj.direction.toUpperCase() == 'Y' ? 'Y' : 'X' 
      this.activeSlide = 0;
      this.height = this.slider.clientHeight;
      this.width = this.slider.clientWidth;
      this.moveSize = this.moveDirection == 'X' ? this.width : this.height 
      this.autoplay = obj.autoplay
      this.timeMove = obj.time || 1000
      this.interval = isNaN(obj.interval) === true || obj.interval == undefined ? this.timeMove + 1000 : obj.interval < this.timeMove + 1000 ? console.error(`Interval 'time' dan kichkina bo'lishi mumkin emas!`) : obj.interval
      this.sliderBox.style = `position:relative;
                                height: ${this.height}px;
                                overflow:hidden;`
      for (let i = 0; i < this.sliderItem.length; i++) {
         const el = this.sliderItem[i];
         el.style = `position:absolute;
                        width:${this.width}px;
                        height:${this.height}px`
         if (i != this.activeSlide) {
            el.style.transform = `translate${this.moveDirection}(${this.moveSize}px)`
         }
         if (i == this.sliderItem.length - 1) {
            el.style.transform = `translate${this.moveDirection}(-${this.moveSize}px)`
         }
      }
      if (this.autoplay === true) {
         let interval = setInterval(() => {
            this.clickBtn(this.next)
         }, this.interval);
         this.sliderBox.addEventListener('mouseenter', () => {
            clearInterval(interval)
         })
         this.sliderBox.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
               this.clickBtn(this.next)
            }, this.interval); 
         })
      }
      this.next.addEventListener('click', () => this.clickBtn(this.next))
      this.prev.addEventListener('click', () => this.clickBtn(this.prev))
   }
   clickBtn(btn) {
      this.next.disabled = true
      this.prev.disabled = true
      setTimeout(() => {
         this.next.disabled = false
         this.prev.disabled = false
      }, this.timeMove);
      const nextOrPrev = btn == this.next ? this.moveSize * -1 : this.moveSize;
      for (let i = 0; i < this.sliderItem.length; i++) {
         const el = this.sliderItem[i];
         el.style.transition = '0ms'
         if (i != this.activeSlide) {
            el.style.transform = `translate${this.moveDirection}(${nextOrPrev * -1}px)`
         }
      }
      this.sliderItem[this.activeSlide].style.transform = `translate${this.moveDirection}(${nextOrPrev}px)`
      this.sliderItem[this.activeSlide].style.transition = this.timeMove + 'ms'
      if (btn == this.next) {
         this.activeSlide++
         if (this.activeSlide >= this.sliderItem.length) {
            this.activeSlide = 0
         }
      } else if (btn == this.prev) {
         this.activeSlide--
         if (this.activeSlide < 0) {
            this.activeSlide = this.sliderItem.length -1
         }
      }
      // console.log(this.moveDirection);
      this.sliderItem[this.activeSlide].style.transform = `translate${this.moveDirection}(0px)`
      this.sliderItem[this.activeSlide].style.transition = this.timeMove + 'ms'
   }
}
const slider = new SLIDER({
   el: '#carousel',
   time: 500,
   autoplay: true,
   interval: 2000,
   direction: ''
})
