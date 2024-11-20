import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  time = new Date();
  christmasDay: any;
  targetDate = new Date("12/25/2024"); //any year added as needed for the getMonth() and getDate() functions to work
  timeDiff: any;
  days: any;
  hours: any;
  minutes: any;
  seconds: any;


  verses = [
    "<h3 class='scriptVer'>And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.</h3><h4 class='scriptNum'>Matthew 1:21</h4>",
    "<h3 class='scriptVer'>For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counseller, The mighty God, The everlasting Father, The Prince of Peace.</h3><h4 class='scriptNum'>Isaiah 9:6</h4>",
    "<h3 class='scriptVer'>Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.</h3><h4 class='scriptNum'>Isaiah 7:14</h4>",
    "<h3 class='scriptVer'>Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.</h3><h4 class='scriptNum'>Matthew 1:23</h4>",
  ]
  chosenVer?: string;

  constructor(){

    // Pick a random scripture
    const ind: number = Math.floor(Math.random() * this.verses.length);
    this.chosenVer = this.verses[ind];

    this.timeYearXmas()
  }
  ngAfterViewInit(){
    setInterval(()=>{this.timeDifference();
      // console.log(this.time.seconds)
    }, 1000)
  }
  timeDifference(){
    this.time = new Date();
    this.timeDiff = this.christmasDay.getTime() - this.time.getTime();
    this.days = Math.floor(this.timeDiff/86400000); // convert milliseconds to days:- 1000 * 60 * 60 * 24 = 86400000)
    this.hours = Math.floor((this.timeDiff%86400000)/3600000);  //convert milliseconds to hours left in day:- (time_difference%(1000 * 60 * 60 * 24))/(1000 * 60 * 60) 
    this.minutes = Math.floor((this.timeDiff%3600000)/60000);  //convert milliseconds to minutes left in hour:- (time_difference%(1000 * 60 * 60))/(1000 * 60 )
    this.seconds = Math.floor((this.timeDiff%(1000 * 60))/(1000));  //convert milliseconds to seconds left in hour:- (time_difference%(1000 * 60))/(1000 * 60 )
  }
  timeYearXmas(){
    if ((this.targetDate.getMonth() > this.time.getMonth()) && (this.targetDate.getDate() >= this.time.getDate())) {
      const date = "12/25/" + this.time.getFullYear();
      this.christmasDay = new Date(date)
    } else {
      const date = "12/25/" + (this.time.getFullYear() + 1);
      this.christmasDay = new Date(date)
    }
  }
}  

// Snow effect below

  export interface SnowFlake {
    /** The current x position. */
    x: number;
    /** The current y position. */
    y: number;
    /** The radius in pixels. */
    radius: number;
    /** A pixel value to add to y movement to speed/slow itself. */
    drop: number;
    /** A pixel value to add to x movement to speed/slow itself. */
    sway: number;
  }
  
  /** Helper function returning a random decimal between min and max. */
  function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  
  /** Helper functions to generate a random int inclusive of min and max. */
  function randomInt(min: number, max: number) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }
  
  // Create and attach our canvas.
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  document.body.appendChild(canvas);
  
  // Update the canvas width/height data when the window resizes.
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Generate some snow flakes.
  const flakes: SnowFlake[] = [];
  const numOfFlakes = randomInt(300, 600);
  for (var i = 0; i < numOfFlakes; i++) {
    flakes.push({
      x: randomInt(0, canvas.width),
      y: randomInt(0, canvas.height),
      radius: random(0.3, 3),
      sway: random(-0.3, 0.3),
      drop: random(-0.3, 0.3),
    });
  }
  
  // Setup and draw our flakes.
  const ctx = canvas.getContext('2d')!;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.66)';
    ctx.beginPath();
    flakes.forEach((flake) => {
      // Draw our flake at its current x/y
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
  
      // Update our flake's next x/y.
      flake.y += 1 + flake.drop;
      flake.x += flake.sway;
      // If our snowflake goes off the left, right or bottom,
      // move it to the opposite side.
      if (flake.x > canvas.width) {
        flake.x = 0;
      } else if (flake.x < 0) {
        flake.x = canvas.width;
      } else if (flake.y > canvas.height) {
        flake.x = randomInt(0, canvas.width);
        flake.y = -2;
      }
    });
    ctx.fill();
  
    // Repeat!
    window.requestAnimationFrame(draw);
  }
  
  // Kick it off.
  window.requestAnimationFrame(draw);



