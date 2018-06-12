import fuzzy from 'fuzzysearch'
import pluralize from 'pluralize'
import {capitalize} from 'attasist'
import {__, always, compose, curry, equals, insert, ifElse, join, nth, path, prop, propEq, trim, when} from 'ramda'

/**
 * Creates a function that can be used in React Table's `getTdProps` method.
 * It expects to be given an "accessor" (in React Table terminology, this is the
 * key name of the data collection being rendered into each row's cell), which
 * corresponds to the cell that should send the user to the detail page when
 * clicked.
 *
 * @func
 * @sig (String, String) -> (_, {k: v}, {k: v}) -> {k: v}
 * @param {String} accessor The key name for the data prop being bound to a
 * specific Cell in a React Table row
 * @param {String} originalField The field name from the data model which will
 * represent the actual identifier
 * @param {String} entityType An optional target type to place on the left side
 * of the colon delimter (defaults to the field name)
 * @returns {Function} A function that is ready to receive the reserved props
 * for React Table's getTdProps
 */
export const createIdForDetailColumn = (accessor = 'name', originalField = 'id', entityType = '') =>
    (_, rowInfo, column) => (
        propEq('id', accessor, column) ? {
            id: `${entityType || prop('id', column)}:${path(['original', originalField], rowInfo) || ''}`
        } : {}
    )

/**
 * Builds a formatted caption out of either a prefix, suffix or both. After
 * passing in the prefix and/or suffix, a function is returned that is ready to
 * receive a count value and build the a caption following the format of
 * "prefix count suffix". The suffix will be pluralized automatically, depending
 * on the count (is greater than 1).
 * The words in the caption will be capitalized automatically,
 * but you can disable this behavior via the third param.
 *
 * @func
 * @sig (String, String) -> (Number -> String)
 * @param {String} prefix The text to precede the count
 * @param {String} suffix The text to follow the count
 * @param {Boolean} shouldCapitalize Whether or not to capitalize each word
 * (defaults to `true`)
 * @returns {String} A function ready to receive a count (`Number`) and will then
 * return the fully formatted caption (including the count)
 */
export const createTotalsCaption = (prefix = '', suffix = '', shouldCapitalize = true) =>
    compose(
        trim,
        when(always(shouldCapitalize), capitalize),
        ifElse(
            compose(equals(1), nth(1)),
            join(' '),
            compose(pluralize, join(' '))
        ),
        insert(1, __, [prefix, suffix])
    )

/**
 * Fuzzy searches for a needle in a haystack (looks for a string fragment in
 * another string).
 *
 * @func
 * @sig String -> String -> Boolean
 * @param {String} needle A value to find in the haystack
 * @param {String} haystack A value to be fuzzy searched
 * @returns {Boolean} Whether or not the needle was found in the haystack
 */
export const fuzzyCurry = curry((needle, haystack) => fuzzy(needle || '', haystack || ''))
