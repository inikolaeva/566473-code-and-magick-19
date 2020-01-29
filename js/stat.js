'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_LEFT_PADDING = 20;
var CLOUD_COLOR = '#fff';
var SHADOW_SIZE = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var succsessMessageFont = '16px PT Mono';
var COLUMN_START_X = 140;
var COLUMN_START_Y = 240;
var COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_LEFT_MARGIN = 50;
var COLUMN_NAME_TOP_PADDING = 5;
var COLUMN_TIME_TOP_PADDING = 20;
var MY_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
var MY_NAME = 'Вы';
var DEFAULT_COLOR = 'black';

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function getRandomSaturation() {
  return Math.random() * 100;
}

function renderStatistics(ctx, names, times) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(CLOUD_X + SHADOW_SIZE, CLOUD_Y + SHADOW_SIZE, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = DEFAULT_COLOR;
  ctx.textAlign = 'top';
  ctx.textBaseline = 'top';
  ctx.font = succsessMessageFont;
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_LEFT_PADDING, CLOUD_Y + 15);
  ctx.fillText('Список результатов: ', CLOUD_X + CLOUD_LEFT_PADDING, CLOUD_Y + 35);

  var maxTime = getMaxElement(times);
  var timeStep = COLUMN_HEIGHT / maxTime;

  for (var i = 0; i < names.length; i++) {
    var columnHeight = times[i] * timeStep;
    var columnX = COLUMN_START_X + (COLUMN_LEFT_MARGIN + COLUMN_WIDTH) * i;
    var columnY = COLUMN_START_Y - columnHeight;
    var timeY = columnY - COLUMN_TIME_TOP_PADDING;
    var nameY = COLUMN_START_Y + COLUMN_NAME_TOP_PADDING;
    var columnColor = names[i] === MY_NAME ? MY_COLUMN_COLOR : 'hsl(240, ' + getRandomSaturation() + '%, 50%)';

    ctx.fillStyle = DEFAULT_COLOR;
    ctx.fillText(Math.round(times[i]), columnX, timeY);
    ctx.fillText(names[i], columnX, nameY);
    ctx.fillStyle = columnColor;
    ctx.fillRect(columnX, columnY, COLUMN_WIDTH, columnHeight);
  }

}
