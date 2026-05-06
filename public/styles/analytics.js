// ===== BLOCO DE SCRIPT 1 =====
!function(e){e.metrics=[],e.logs=[],e.__now=function(){if("performance"in window&&performance.now)return performance.now()},e.__mark=function(n){"performance"in window&&performance.mark&&performance.mark("sx:"+n)},e.__measure=function(n,e,t){"performance"in window&&performance.measure&&performance.measure("sx:"+n,"sx:"+e,"sx:"+t)};var t=e.history.pushState;e.history.onpushstate=function(n){e.$HAS_REGISTERED_NAVIGATION_CHANGE=!0,e.history.onpushstate=void 0},e.history.pushState=function(n){return"function"==typeof e.history.onpushstate&&e.history.onpushstate({state:n}),t.apply(e.history,arguments)}}(window),function(n){n.__trackTiming=function(n,e,t,i){t={type:"log"===n?"log":"histogram",key:e,value:t};null!=i&&(t.tags=i),t=t,window.metrics.push(t)}}(window),function(n){function e(){n.__trackAbandonsTeardown(),__trackTiming("mark","sx:abandon",Math.round(__now()))}document.addEventListener("visibilitychange",e);var t=document.removeEventListener;n.__trackAbandonsTeardown=function(){t.call(document,"visibilitychange",e)}}(window),function(i){try{var n,e;"PerformanceObserver"in window&&(i.maxPotentialFirstInputDelay=0,c=addEventListener,u=removeEventListener,p=[],d={passive:!0,capture:!0},l=new Date,w="pointerup",y="pointercancel",a(c),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){p.push(n),t()},perfMetrics.onFirstInputDelay(function(n,e){__trackTiming("measure","sx:first_input_delay:duration",Math.round(n)),__trackTiming("measure","sx:max_potential_first_input_delay:duration",Math.round(i.maxPotentialFirstInputDelay||n))}),i.lastVisibilityChange=0,document.addEventListener("visibilitychange",function(){i.lastVisibilityChange=performance.now()}),n=[],"PerformanceMeasure"in window&&n.push("measure"),"PerformancePaintTiming"in window&&n.push("paint"),"PerformanceLongTaskTiming"in window&&n.push("longtask"),n.length&&(e=new PerformanceObserver(function(n){n.getEntries().forEach(function(n){var e;"longtask"===n.entryType&&n.duration>i.maxPotentialFirstInputDelay&&(i.maxPotentialFirstInputDelay=n.duration),"paint"===n.entryType&&(e=n.startTime),"mark"===n.entryType&&0===n.name.indexOf("sx")&&(e=n.startTime),"measure"===n.entryType&&0===n.name.indexOf("sx")&&(e=n.duration);var t=n.startTime<i.lastVisibilityChange||document.hidden;void 0===e||t||i.__trackTiming(n.entryType,n.name,Math.round(e),null)})}),n.map(function(n){e.observe({type:n})})))}catch(n){i.__trackTiming("mark","sx:performance_observer:exception",Math.round(__now()))}function s(n,e){o||(o=e,m=n,f=new Date,a(u),t())}function t(){0<=m&&m<f-l&&(p.forEach(function(n){n(m,o)}),p=[])}function r(n){var e,t,i;function r(){s(t,i),o()}function a(){o()}function o(){u(w,r,d),u(y,a,d)}n.cancelable&&(e=(1e12<n.timeStamp?new Date:performance.now())-n.timeStamp,"pointerdown"==n.type?(t=e,i=n,c(w,r,d),c(y,a,d)):s(e,n))}function a(e){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(n){e(n,r,d)})}var c,u,o,m,f,p,d,l,w,y}(window);

// ===== BLOCO DE SCRIPT 2 =====
!function(e){var a="4g",c=!1;e.addEventListener("load",function(){void 0!==e.navigator&&"connection"in e.navigator&&"effectiveType"in e.navigator.connection?a=navigator.connection.effectiveType:void 0!==e.performance&&function(){var e=performance.getEntriesByType&&performance.getEntriesByType("resource");if(void 0===e||e.length<=0)a="not-detectable";else{for(var n,t=[],i=!1,r=0;r<e.length;r++){var o=e[r];if(void 0===o.transferSize){i=!0;break}0<o.transferSize&&(o=o.transferSize/((o.responseEnd-o.fetchStart)/1e3),t.push(o))}i?(n=performance.timing.responseEnd-performance.timing.responseStart)<100&&(a=n<50?"2g":"3g"):(t.reduce(function(e,n){return e+n},0),t.length,100<n&&(a="2g")),c=!i,estimatedTiming=!0}}(),e.$EFFECTIVE_CONNECTION_TYPE=a+"",e.metrics.push({type:"increment",key:"sx:connection_type",tags:{value:a,estimate_timing:!1,uses_timing_api:c}})})}(window);

// ===== BLOCO DE SCRIPT 3 =====
__mark("head:start");
        window.$VANGUARD = true;
        window.$VERSION = "0.16815.0";
        window.$RELEASE_STAGE = "production";
        window.dataLayer = window.dataLayer || [];
        window.gtmReady = false;
        window.tempDataLayer = [];
        window.$RENDERED_ASYNC = false;
        window.cdnUrl = "/";
        window.cloudinaryBase = "";
        window.$DEVICE_TYPE = "desktop";
        window.$SHOW_REGIONAL_REDIRECT = "false";
        window.$GEO_COUNTRY = "BRA";
        window.$DATADOG_ENV = "THERACORP-prod";
        window.$DATADOG_APPLICATION_ID = "6d67f57e-1df6-4c70-ae30-36c007e5abc8";
        window.$DATADOG_CLIENT_TOKEN = "pub74ddba6a0a25317a26d3544ef7e00104";
        window.$DATADOG_SERVICE = "store-ui-web";
        window.$AUTH0_DOMAIN = "prod-theracorp.us.auth0.com";
        window.$AUTH0_CLIENT_ID = "5sVqaoDHRokqC2cFNq9twZ0qcivZ3gkk";
        window.$AUTH0_AUTH_PARAM_AUDIENCE = "https://store-backend-api";
        window.$DEEP_LINK_EMAIL_ENCRYPTION_KEY = "Mg1PJNMTrJQKAKMf/Jdvw91xJtYDKZjMX/q701aF2Rg=";
        window.$DD_ENV = "prod";
        window.$HIMS_URL = "https://www.THERACORP.com/";
        window.$HERS_URL = "https://www.forhers.com/";
        window.$ADYEN_CLIENT_KEY = "live_AW26YXTA5NGUJAGW2BRF76PHBI27SNOJ";
        window.$ADYEN_JS_URL = "https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/5.64.0/adyen.js";
        window.$ADYEN_JS_INTEGRITY = "sha384-sMGpagK0z1bjcfZfff+YN53lBOwP4Cmh6exNnmkiBegM4oil5xetgPHP+JJ+bbrf";
        window.$ADYEN_CSS_URL = "https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/5.64.0/adyen.css";
        window.$ADYEN_CSS_INTEGRITY = "sha384-Dk62669n9Ic7V6K8X7MBAOEZ5IQ9Qq29nW/zPkfwg1ghqyZLiuSc5QYQJ6M72iNR";
        window.$OBFUSCATE_API_ENDPOINT = undefined;
        window.$OBFUSCATE_API_KEY = undefined;
        window.$GO_FLOW_SERVER_ENDPOINT = "https://flow-server.THERACORP.com";
        window.$HIMS_WEB_GROWTHBOOK_KEY = "zyxd1aYRswpTJBdcpB51jw==";
        window.global = window;
        window.$GRECAPTCHA_SCORE_KEY = "6Le_ceMqAAAAAC2XPAcBJU84ZeT9N15YHcPy4mJN";
        window.$GRECAPTCHA_CHALLENGE_KEY = "6Lc7eOMqAAAAAN-Wh0J1pRn0cVekutjzoDT9b-mm";

        try {
          // define uneditable env vars props on window
          Object.defineProperties(window, {
            $IS_ALTERNATE_DOMAIN: {
              value: false,
              writable: false,
              configurable: false,
            },
            $REDIRECT_DOMAIN: {
              value: "",
              writable: false,
              configurable: false,
            },
            $HIMS_DOT_COM_ENABLED: {
              value: true,
              writable: false,
              configurable: false,
            },
            HIMS_EMR_API_ENDPOINT: {
              value: "https://api.theracorp.com",
              writable: false,
              configurable: false,
            },
            HIMS_EMR_MESSAGING_API_ENDPOINT: {
              value: "https://messaging-rest-prod.theracorp.com",
              writable: false,
              configurable: false,
            },
            HIMS_STORE_API_ENDPOINT: {
              value: "https://api.theracorp.com/store",
              writable: false,
              configurable: false,
            },
            HIMS_TOOLS_API_ENDPOINT: {
              value: "https://api.theracorp.com/tools",
              writable: false,
              configurable: false,
            },
            HIMS_API_STAGE: {
              value: "prod",
              writable: false,
              configurable: false,
            },
            HIMS_STRIPE_KEY: {
              value: "pk_live_pdltdmtOaw0aPukHbkLlExFo",
              writable: false,
              configurable: false,
            },
            GRAPHQL_ENDPOINT: {
              value: "https://api.theracorp.com/graphql",
              writable: false,
              configurable: false,
            },
            X_GRAPHQL_SERVER_HTTP_HEADER: {
              value: undefined,
              writable: false,
              configurable: false,
            },
            HIMS_METRICS_API_ENDPOINT: {
              value: "https://api.theracorp.com/tools/metrics",
              writable: false,
              configurable: false,
            },
            HIMS_WEB_GROWTHBOOK_API_ENDPOINT: {
              value: "https://www.THERACORP.com/integrations/growthbook/api/features/sdk-XP8rmd3vGii4t7Q1",
              writable: false,
              configurable: false,
            },
            HIMS_WEB_BRAZE_HIMS_API_KEY: {
              value: "5b292436-bd8b-4de8-a7b7-1f331bc62608",
              writable: false,
              configurable: false,
            },
            HIMS_WEB_BRAZE_HERS_API_KEY: {
              value: "3ed8a3de-4d7f-42ff-ab05-0516081ed7ca",
              writable: false,
              configurable: false,
            },
            $GROWTHBOOK_RESOLVED_FEATURES: {
              value: {"variants":{},"features":{"web-standalone-cart":{"value":true,"on":true,"off":false,"source":"defaultValue","ruleId":""},"sub-manage-cancel":{"value":false,"on":false,"off":true,"source":"defaultValue","ruleId":""},"promoBanner":{"value":false,"on":false,"off":true,"source":"defaultValue","ruleId":""},"mh-subscriptions-v2-renewals":{"value":true,"on":true,"off":false,"source":"defaultValue","ruleId":""},"web-early-check-in":{"value":true,"on":true,"off":false,"source":"force","ruleId":""},"early-pej-hybrid-check-ins":{"value":false,"on":false,"off":true,"source":"defaultValue","ruleId":""},"early-psych-hybrid-check-ins":{"value":true,"on":true,"off":false,"source":"force","ruleId":""},"early-weight-management-hybrid-check-ins":{"value":false,"on":false,"off":true,"source":"defaultValue","ruleId":""},"early-tmnt-hybrid-check-ins":{"value":true,"on":true,"off":false,"source":"defaultValue","ruleId":""},"early-hairloss-hybrid-check-ins":{"value":false,"on":false,"off":true,"source":"defaultValue","ruleId":""},"express-ed-hybrid-check-ins":{"value":true,"on":true,"off":false,"source":"force","ruleId":""},"express-wl-hybrid-check-ins":{"value":false,"on":false,"off":true,"source":"defaultValue","ruleId":""},"express-pej-hybrid-check-ins":{"value":true,"on":true,"off":false,"source":"force","ruleId":""},"force-crash-tools":{"value":false,"on":false,"off":true,"source":"force","ruleId":""},"meal-kit-promo":{"value":true,"on":true,"off":false,"source":"force","ruleId":""},"hp-waitlist":{"value":true,"on":true,"off":false,"source":"force","ruleId":""},"hp-nn-update":{"value":true,"on":true,"off":false,"source":"force","ruleId":""}}},
              writable: false,
              configurable: false,
            },
            $GROWTHBOOK_RESOLVED_VARIATION_FEATURES: {
              value: {},
              writable: false,
              configurable: false,
            },
            HIMS_HPT_PPACK: {
              value: {},
              writable: false,
              configurable: false,
            }
          });
        } catch (e) {
          window.stop();
        }

// ===== BLOCO DE SCRIPT 4 =====
window.experiments=window.experiments||{},window.setExperiment=function(){var n={},r=function(){for(var t={},e=0;e<arguments.length;e++)!function(e){for(var n in e)e.hasOwnProperty(n)&&(t[n]="[object Object]"===Object.prototype.toString.call(e[n])?r(t[n],e[n]):e[n])}(arguments[e]);return t};return function(e){e&&(e.name?e.variant?n[e.name]||((n[e.name]=e).payload&&(window.experiments=r(window.experiments,e.payload)),dataLayer.push({event:"experiment_bucket",experiment_name:e.name,variant:e.variant,version:e.version||1})):console.error("experiment 'variant' not set",e):console.error("experiment 'name' not set",e))}}();

// ===== BLOCO DE SCRIPT 5 =====
__mark("head:end");
        __measure("head:duration", "head:start", "head:end");
