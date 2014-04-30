/**
 *  Use async script loader, configure the application module (for AngularJS)
 *  and initialize the application ( which configures routing )
 *
 *  @author Thomas Burleson
 */

(function( head ) {
    "use strict";

    var $bar = null;

    head.js(

        /**
         *  Load vendor libraries
         */
          { angular      : "vendor/angular/angular.js"                             , size : "803501" }
        , { ngSanitize   : "vendor/angular-sanitize/angular-sanitize.min.js"       , size : "4317"   }
        , { ngAnimate    : "vendor/angular-animate/angular-animate.js"             , size : "80669"  }
        , { uiRoute      : "vendor/angular-ui-router/release/angular-ui-router.js" , size : "116478" }
        , { uibootstrap  : "vendor/angular-bootstrap/ui-bootstrap-tpls.js"         , size : "122558" }

        , { jquery       : "vendor/jquery/jquery.min.js"                           , size : "83606"  }
        , { toastr       : "vendor/toastr/toastr.js"                               , size : "7734"   }
        , { require      : "vendor/requirejs/require.js"                           , size : "82718"  }

        , { breeze_debug : "vendor/breeze/breeze.debug.js"                         , size : "617110" }
        , { breeze_ng    : "vendor/breeze/breeze.angular.js"                       , size : "5536"   }
        , { breeze_mongo : "vendor/breeze/breeze.dataservice.mongo.js"             , size : "8825"   }
        , { breeze_meta  : "vendor/breeze/breeze.metadata-helper.js"               , size : "16463"  }

        , { zza          : "./assets/js/zza.js"                                    , size : "32000"  }
    )
    .notify( function(name, size, loaded, total) {
        var percentDone;

        if (!(total != null))     return;
        if (name === 'jquery')    $bar = $('.progress .bar');

        percentDone = Math.floor(loaded / total * 100);
        $bar && $bar.width("" + percentDone + "%");
    })
    .ready("ALL", function()
    {
        $bar.delay( 600 )
            .promise()
            .then( startZza   )
            .then( hideSplash );
    });


    // **********************************************************
    // Private Methods
    // **********************************************************

    /**
     * Fadeout and remove Splash Preloader view
     */
    function hideSplash( )
    {
        $( '#startup' )
            .fadeOut( 200 )
            .promise()
            .then( function()
            {
                $( '#startup').remove();
                $bar = null;
            });
    }

    /**
     * Start the Zza SPA
     * @returns $.promise
     */
    function startZza()
    {
        require( [ "Zza" ], function( app )
        {
            // Application has bootstrapped and started...
        });

        return $.when( true );
    }


}( window.head ));
