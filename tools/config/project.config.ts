import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
     // Add packages (e.g. angular2-jwt)
    
     this.APP_TITLE = 'Tessol Thermal Energy Solutions';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
       //{src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'}
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    let additionalPackages: ExtendPackages[] = [{
      name: '@ng-idle/core',
      // Path to the package's bundle
      path: 'node_modules/@ng-idle/core/bundles/core.umd.js'
    },{
      name: 'angular2-moment',
      // Path to the package's bundle
      path: 'node_modules/angular2-moment/index.js'
    },{
      name: 'moment',
      // Path to the package's bundle
      path: 'node_modules/moment/moment.js'
     }
    ,{
      name: 'ng2-bootstrap',
      // Path to the package's bundle
      path: 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
    },
    {
      name: 'jquery',
      // Path to the package's bundle
      path: 'node_modules/jquery/dist/jquery.min.js'
    }
   ];
    this.addPackagesBundles(additionalPackages);
    // Add packages (e.g. ng2-translate)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
