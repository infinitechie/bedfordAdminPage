/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'firebase': 'npm:firebase',
      'primeng':                   'npm:primeng',
      'ng2-charts': 'npm:ng2-charts/bundles/ng2-charts.umd.min.js',
    
    
      // 'moment': 'node_modules/moment/moment.js',
      // 'ng2-bootstrap/ng2-bootstrap': 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
      // 'ng2-slimscroll': 'npm:ng2-slimscroll', 
    },

    
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
    //    'ng2-bootstrap': { defaultExtension: 'js' },
    // 'moment':                     { main: 'moment.js', defaultExtension: 'js' },
      // 'ng2-slimscroll': {  main: './ng2-slimscroll.js', defaultExtension: 'js' },
      
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'firebase': {
                main: './app.js',
                defaultExtension: 'js'
            },

 primeng: {
          defaultExtension: 'js'
      }


            
    }
  });
})(this);