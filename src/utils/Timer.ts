// timer upcount
export default class Timer {
  private _time: number = 0;
  private _timer: any = null;
  private _isRunning: boolean = false;
  public minutes: number = 0;
  public seconds: number = 0;

  constructor() {
    this._time = 0;
    this._timer = null;
    this._isRunning = false;
    this.minutes = 0;
    this.seconds = 0;
  }

  public start() {
    this._isRunning = true;
    this._timer = setInterval(() => {
      this._time++;
      this.minutes = Math.floor(this._time / 60);
      this.seconds = this._time % 60;
    }, 1000);
  }

  public stop() {
    this._isRunning = false;
    clearInterval(this._timer);
  }

  public reset() {
    this._time = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  public get isRunning() {
    return this._isRunning;
  }

  public get time() {
    return this._time;
  }

  public set time(value: number) {
    this._time = value;
  }

  public get timer() {
    return this._timer;
  }

  public set timer(value: any) {
    this._timer = value;
  }
}
