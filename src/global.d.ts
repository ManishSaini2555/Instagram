declare module '*.scss';

interface Window {
  env: {
    BASE_URL: string
    CLIENT_ID: string
    AUTHORITY: string
    KNOWN_AUTHORITY: string
    SCOPE: string
    SUBSCRIPTION_KEY: string
    REACT_APP_AVELO_BASE_URL: string
    APP_INSIGHTS_INSTRUMENTATION_KEY: string
    WORK_DAY_START: string
    WORK_DAY_END: string
    SSO_SILENT_LOGIN_ACTIVE: string
    SHOW_BUILD_NUMBER: string
    LOGOUT_AFTER_MINUTES: string
    BUILD_NUMBER: string
    GIT_VERSION: string
    INVALIDATE_URL: string
    OCP_APIM_TRACE: string
    TEST_RESULTS_DAY_PERIOD: string
    TEST_RESULTS_COUNT_OF_PERIOD: string
    TEST_RESULTS_MAX_COUNT: string
  }
  dataLayer: any[]
}
declare namespace JSX {
  interface IntrinsicElements {
    'ct-smartblock': any // Replace 'any' with the type of the component's props if available
  }
}
