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
 * Возвращает список событий для удаления
 * @param {String} event
 * @returns {String[]}
 */
function getOffEvents(event) {
    const keys = Object.keys(subs);
    let result = [];
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].startsWith(event)) {
            result.push(keys[i]);
        }
    }

    return result.sort().reverse();
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

        // - отписка от `slide.funny` отписывает только от него
        // - отписка от `slide` отписывает и от `slide`, и от `slide.funny`

        off: function (event, context) {
            const events = getOffEvents(event);
            for (let i = 0; i < events.length; i++) {
                const evt = events[i];
                subs[evt] = subs[evt].filter(entry => entry.ctx !== context);
            }

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
