'use strict';

// var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var familyNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var generateRandomArrayElement = function (array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

var generateWizards = function (length) {
  var wizards = [];
  for (var i = 0; i < length; i++) {
    wizards.push({
      name: generateRandomArrayElement(names) + ' ' + generateRandomArrayElement(familyNames),
      coats: generateRandomArrayElement(coatColors),
      eyes: generateRandomArrayElement(eyesColors),
    });
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coats;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

  return wizardElement;
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var getWizards = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]));
  }
  similarListElement.appendChild(fragment);
};

getWizards(generateWizards(4));

document.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEY = 27;
var ENTER_KEY = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var inputElement = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY && !inputElement.matches(':focus')) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');
var wizardCoatInput = setup.querySelector('input[name="coat-color"]');
var wizardEyesInput = setup.querySelector('input[name="eyes-color"]');
var wizardFireballInput = setup.querySelector('input[name="fireball-color"]');


var setColor = function (coat, eyes, fire) {
  coat.addEventListener('click', function () {
    coat.style.fill = generateRandomArrayElement(coatColor);
    wizardCoatInput.value = coat.style.fill;
  });
  eyes.addEventListener('click', function () {
    eyes.style.fill = generateRandomArrayElement(eyesColor);
    wizardEyesInput.value = eyes.style.fill;
  });
  fire.addEventListener('click', function () {
    fire.style.background = generateRandomArrayElement(fireballColor);
    wizardFireballInput.value = fire.style.background;
    // console.log(generateRandomArrayElement(fireballColor));
  });
};

setColor(wizardCoat, wizardEyes, fireball);
