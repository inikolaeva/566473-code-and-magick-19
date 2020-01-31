'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_LEFT_PADDING = 20;
var CLOUD_COLOR = '#fff';
var SHADOW_SIZE = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var COLUMN_START_X = 140;
var COLUMN_START_Y = 240;
var COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_LEFT_MARGIN = 50;
var COLUMN_NAME_TOP_PADDING = 5;
var COLUMN_TIME_TOP_PADDING = 20;
var MY_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
var DEFAULT_COLOR = 'black';
var SUSSESS_MESSAGE_FONT = '16px PT Mono';
var MY_NAME = 'Вы';


var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomSaturation = function () {
  return Math.random() * 100;
};

var getColorByName = function (name) {
  return name === MY_NAME ? MY_COLUMN_COLOR : 'hsl(240, ' + getRandomSaturation() + '%, 50%)';
};

var drawSuccsessWindowTitle = function (ctx) {
  ctx.fillStyle = DEFAULT_COLOR;
  ctx.textAlign = 'top';
  ctx.textBaseline = 'top';
  ctx.font = SUSSESS_MESSAGE_FONT;
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_LEFT_PADDING, CLOUD_Y + 15);
  ctx.fillText('Список результатов: ', CLOUD_X + CLOUD_LEFT_PADDING, CLOUD_Y + 35);
};

var drawChartColumn = function (ctx, name, columnX, columnY, columnHeight) {
  ctx.fillStyle = getColorByName(name);
  ctx.fillRect(columnX, columnY, COLUMN_WIDTH, columnHeight);
};

var drawChartColumnLegend = function (ctx, name, time, columnX, nameY, timeY) {
  ctx.fillStyle = DEFAULT_COLOR;
  ctx.fillText(Math.round(time), columnX, timeY);
  ctx.fillText(name, columnX, nameY);
};

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(CLOUD_X + SHADOW_SIZE, CLOUD_Y + SHADOW_SIZE, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  drawSuccsessWindowTitle(ctx);

  var maxTime = getMaxElement(times);
  var timeStep = COLUMN_HEIGHT / maxTime;

  for (var i = 0; i < names.length; i++) {
    var columnHeight = times[i] * timeStep;
    var columnX = COLUMN_START_X + (COLUMN_LEFT_MARGIN + COLUMN_WIDTH) * i;
    var columnY = COLUMN_START_Y - columnHeight;
    var timeY = columnY - COLUMN_TIME_TOP_PADDING;
    var nameY = COLUMN_START_Y + COLUMN_NAME_TOP_PADDING;

    drawChartColumnLegend(ctx, names[i], times[i], columnX, nameY, timeY);
    drawChartColumn(ctx, names[i], columnX, columnY, columnHeight);
  }

};
