'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

let subs = [];

/**
 * Возвращает список предшествующих событий
 * @param {String} event
 * @returns {String[]}
 */
function getQueryEvent(event) {
    let result = [event];
    let pos = -1;
    while ((pos = event.indexOf('.', pos + 1)) !== -1) {
        result.push(event.substring(0, pos));
    }

    return result.sort().reverse()
        .filter(ivent => subs[ivent] !== undefined);
}

/**
 * Возвращает записи соответствующие событию
 * @param {String} event
 * @returns {Object[]}
 */
function getEntriesByEvent(event) {

    return subs[event];
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
            if (subs[event]) {
                subs[event].push({ ctx: context, func: handler });
            } else {
                subs[event] = [{ ctx: context, func: handler }];
            }

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            subs[event] = subs[event].filter(entry => entry.ctx !== context);

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            const eventsPool = getQueryEvent(event);
            for (let i = 0; i < eventsPool.length; i++) {
                const entries = getEntriesByEvent(eventsPool[i]);
                for (let j = 0; j < entries.length; j++) {
                    const entry = entries[j];
                    entry.func.call(entry.ctx);
                }
            }

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
