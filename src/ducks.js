import {createRow} from 'ruddy'
import auth from './components/auth/ducks'

/**
* Creating a row of ducks makes more sense when there's many ducks:
* @example createRow(hueyDuck, deweyDuck, louieDuck, donaldDuck, scroogeMcDuck)
*/

export default createRow(auth)
