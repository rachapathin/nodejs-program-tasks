import * as config from './config/config.json';
import {User, Product} from './models';
import {DirWatcher, Importer} from './modules';

console.log(config.name);
const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher);

dirWatcher.watchPath(`${process.cwd()}/data`, 2000);
importer.listenChanges();
