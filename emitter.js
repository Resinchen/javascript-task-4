'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

let subs = [];

function getQueryEvent(event) {
    let result = [event];
    let pos = -1;
    while ((pos = event.indexOf('.', pos + 1)) !== -1) {
        result.push(event.substring(0, pos));
    }

    return result.sort().reverse();
}

function getEntryByEvent(event) {
    for (let i = 0; i < subs.length; i++) {
        if (event === subs[i].key.evt) {
            return subs[i];
        }
    }
}

function getSubsForEvent(event) {
    let result = [];
    for (let i = 0; i < subs.length; i++) {
        if (event === subs[i].key) {
            result.push(subs[i]);
        }
    }

    return result;
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
         */
        on: function (event, context, handler) {
            subs.push({ key: { evt: event, ctx: context }, value: handler });
            console.info(event, context, handler);
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            const subsOfEvent = getSubsForEvent(event);
            for (let i = 0; i < subsOfEvent.length; i++) {
                if (context === subsOfEvent[i].value) {
                    const index = subs.indexOf(context);
                    subs.splice(index, 1);
                }
            }
            console.info(event, context);
        },

        /**
         * Уведомить о событии
         * @param {String} event
         */
        emit: function (event) {
            const events = getQueryEvent(event);
            for (let i = 0; i < events.length; i++) {
                let entry = getEntryByEvent(events[i]);
                entry.value.call(entry.key.ctx);
            }
            console.info(event);
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
