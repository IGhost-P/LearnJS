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

  constructor(coords, distance, duration) {
    // 옛날엔..
    // this.date = new Date();
    // this. id = ... 이런식
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  _setDescription() {
    // prettier-ignore => 아래 코드가 프리티어 되지 않음
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription(); // type이 없는 work class에서 는 사용하지 못한다
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
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

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none'; // 스타일을 먼저 없애고
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000); // 그 다음 스타일이 와야함
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
    this._renderWorkoutMarker(workout); // this 키워드에 의해 나오기 때문에 bind를 안해줘도됨
    // Render work on list
    this._renderWorkout(workout);
    // Hide Clear inpur fields
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
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
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
    // 이래야 형제 요소 앞으로 추가가 된다
    form.insertAdjacentHTML('afterend', html);
  }
}

const app = new App();
