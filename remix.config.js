/** @type {import('@remix-run/dev').AppConfig} */

export default {
  ignoredRouteFiles: ["*/."],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",                    /store/1/product/1
  routes(definedRoutes) {
    return definedRoutes((route) => {
      route("", "pages/index.tsx", { index: true });
      route("/user", "pages/user/create.tsx", { index: true });
      route("login", "pages/login/login.tsx");
      route("logout", "pages/logout/logout.tsx");
      route("store/:storeId/create", "pages/store/create.tsx" )
      route("store/:storeId", "pages/store/store.tsx", () => {
        route("", "pages/store/product/index.tsx", { index: true });
        route("product/create", "pages/store/product/create.tsx", { index: true });
        route("product/:productId", "pages/store/product/inventory/index.tsx", () => {
          route("", "pages/store/product/inventory/inventories.tsx", { index: true })
          route("inventory/create", "pages/store/product/inventory/create.tsx")
        })
      })
      route("store", "pages/store/index.tsx");
    })
  }
};