import * as config from './config/config.json';
import {User, Product} from './models';

console.log(config.name);
const user = new User();
const product = new Product();
