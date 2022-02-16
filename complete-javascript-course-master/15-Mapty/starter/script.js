'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// OBJECT
class Workout {
  date = new Date();
  id = String(Date.now()).slice(-10); // 하지만 사용자 여러명이 동시에 사용할 가능성이 있기때문에 id를 시간으로 하는것은 좋지 않다

  constructor(coords, distance, duraton) {
    // 옛날엔..
    // this.date = new Date();
    // this. id = ... 이런식
    this.distance = distance;
    this.duraton = duraton;
    this.coords = coords;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elecationGain) {
    super(coords, distance, duration);
    this.elecationGain = elecationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// APP APLICATION
class App {
  #map;
  #mapEvent;
  #workouts = [];
  constructor() {
    // 위치 정보 가져오기
    this._getPosition();

    form.addEventListener('submit', this._newWorkOut.bind(this));

    inputType.addEventListener('change', () => this._toggleElevationField());
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        // 하지만 _loadMap에서 사용하는 this가 제대로 바인딩 되어 있지 않기때문에 (지금은 콜백으로 들어왔으니 this 바인딩이 다른 객체로 되어있음)
        // 그래서 this를 수동으로 bind하거나 화살표 함수를 이용
        // = this._loadMap.bind(this),
        position => this._loadMap(position),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    this.#map = L.map('map').setView([latitude, longitude], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // mapE는 이벤트 객체로 on 이벤트에서 오고, this또한 on 이벤트 핸들러를 가르키기 떄문에 this 바인딩을 수동으로 해줘야한다
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputCadence.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkOut(e) {
    e.preventDefault();
    // helper function
    const valudInput = (...inputs) => {
      return inputs.every(inp => Number.isFinite(inp));
    };
    const allPositive = (...inputs) => {
      return inputs.every(inp => inp > 0);
    };
    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value; // 문자열이여서 숫자로 변경
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout runnong, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is vaild
      if (
        // 원래는 이렇게 하나하나 해야하는데
        // !Number.isFinite(distance)||
        // !Number.isFinite(duration)
        !valudInput(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Inputs have to positive numbers!');
      }

      // 정상 입력, 객체 만들기
      workout = new Running([lat, lng], distance, duration, cadence);
      console.log(workout);
    }
    // If workout cycling, create running object
    if (type === 'cycling') {
      const elecation = +inputElevation.value;
      // Check if data is vaild
      if (
        !valudInput(distance, duration, elecation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Inputs have to positive numbers!');
      }

      // 정상 입력, 객체 만들기
      workout = new Cycling([lat, lng], distance, duration, elecation);
    }
    // Add new object to workout array
    this.#workouts.push(workout);
    // Render workout on map as marker
    this.renderWorkoutMarker(workout); // this 키워드에 의해 나오기 때문에 bind를 안해줘도됨
    // Render work on list

    // Hide Clear inpur fields
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
  }

  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent('workout')
      .openPopup();
  }
}

const app = new App();
