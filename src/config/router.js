const lazyLoading = (name, index = false) => () => System.import(`../pages/${name}${index ? '/index' : ''}.vue`);
// const Loading = (name, index = false) => require(`../pages/${name}${index ? '/index' : ''}.vue`);

export default {
    root: '/',
    base: __dirname,
    // mode: 'history',
    //linkActiveClass: 'is-active',
    routes: [
        {
            name: 'Home',
            path: '/',
            component: lazyLoading('Home')
        },
        {
            name: 'Auth',
            path: '/auth',
            component: lazyLoading('Auth', true),
            children: [
                {
                    name: 'Auth.Login',
                    path: 'login',
                    component: lazyLoading('Auth/Login')
                },
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
}

