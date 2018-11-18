'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

const subscribes = {};

/**
 * Возвращает список из event и его предшественников
 * @param {String} event
 * @returns {String[]}
 */
function getEmitEvent(event) {
    const result = [event];
    let pos = event.indexOf('.');
    while (pos !== -1) {
        result.push(event.substring(0, pos));
        pos = event.indexOf('.', pos + 1);
    }

    return result.sort()
        .reverse()
        .filter(ivent => subscribes[ivent] !== undefined);
}

/**
 * Возвращает список событий для удаления
 * @param {String} event
 * @returns {String[]}
 */
function getOffEvents(event) {
    return Object.keys(subscribes)
        .filter(item => item === event || item.startsWith(event + '.'));
}

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            if (!subscribes[event]) {
                subscribes[event] = [];
            }
            subscribes[event].push({ ctx: context, func: handler });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            const events = getOffEvents(event);
            events.forEach(function (item) {
                subscribes[item] = subscribes[item].filter(entry => entry.ctx !== context);
            });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            const events = getEmitEvent(event);
            events.forEach(function (item) {
                const entries = subscribes[item];
                entries.forEach(function (entry) {
                    entry.func.call(entry.ctx);
                });
            });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
