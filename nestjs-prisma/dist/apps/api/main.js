/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const data_access_posts_1 = __webpack_require__(13);
const data_access_users_1 = __webpack_require__(6);
const data_access_inventory_1 = __webpack_require__(16);
const data_access_stores_1 = __webpack_require__(23);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            data_access_users_1.DataAccessUsersModule,
            data_access_posts_1.DataAccessPostsModule,
            data_access_stores_1.DataAccessStoresModule,
            data_access_inventory_1.DataAccessInventoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const data_access_users_1 = __webpack_require__(6);
const data_access_posts_1 = __webpack_require__(13);
const data_access_inventory_1 = __webpack_require__(16);
const data_access_stores_1 = __webpack_require__(23);
let AppController = exports.AppController = class AppController {
    constructor(userService, postService, inventoryService, storeService) {
        this.userService = userService;
        this.postService = postService;
        this.inventoryService = inventoryService;
        this.storeService = storeService;
    }
    async getPostById(id) {
        return this.postService.post({ id: Number(id) });
    }
    async getItemById(id) {
        return this.inventoryService.item({ id: Number(id) });
    }
    async getPostsAndItems() {
        const posts = this.postService.posts({ where: { published: true } });
        const items = this.inventoryService.items({
            where: { quantity: { gt: 0 } },
        });
        return Promise.all([posts, items]).then(([posts, items]) => [
            ...posts,
            ...items,
        ]);
    }
    async getFilteredPosts(searchString) {
        const posts = this.postService.posts({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchString,
                        },
                    },
                    {
                        content: {
                            contains: searchString,
                        },
                    },
                ],
            },
        });
        const items = this.inventoryService.items({
            where: {
                AND: [
                    {
                        title: {
                            contains: searchString,
                        },
                    },
                    {
                        quantity: {
                            gt: 0,
                        },
                    },
                ],
            },
        });
        return Promise.all([posts, items]).then(([posts, items]) => [
            ...posts,
            ...items,
        ]);
    }
    async createdDraft(postData) {
        const { title, content, authorEmail } = postData;
        return this.postService.createPost({
            title,
            content,
            author: {
                connect: { email: authorEmail },
            },
        });
    }
    async createItem(itemData) {
        const { title, quantity, storeId } = itemData;
        return this.inventoryService.createItem({
            title,
            quantity,
            store: {
                connect: { id: storeId },
            },
        });
    }
    async createUser(userData) {
        const { name, email } = userData;
        return this.userService.createUser({
            name,
            email,
        });
    }
    async createStore(storeData) {
        const { name } = storeData;
        return this.storeService.createStore({
            name,
        });
    }
    async publishPost(id) {
        return this.postService.updatePost({
            where: { id: Number(id) },
            data: { published: true },
        });
    }
    async updateQuanityt(id, itemData) {
        return this.inventoryService.updateItem({
            where: { id: Number(id) },
            data: { quantity: itemData.quantity > 0 ? itemData.quantity : 0 },
        });
    }
    async deletePost(id) {
        return this.postService.deletePost({ id: Number(id) });
    }
    async deleteItem(id) {
        return this.inventoryService.deleteItem({ id: Number(id) });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('post/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getPostById", null);
tslib_1.__decorate([
    (0, common_1.Get)('item/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getItemById", null);
tslib_1.__decorate([
    (0, common_1.Get)('feed'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getPostsAndItems", null);
tslib_1.__decorate([
    (0, common_1.Get)('filter/:searchString'),
    tslib_1.__param(0, (0, common_1.Param)('searchString')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getFilteredPosts", null);
tslib_1.__decorate([
    (0, common_1.Post)('post'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "createdDraft", null);
tslib_1.__decorate([
    (0, common_1.Post)('item'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "createItem", null);
tslib_1.__decorate([
    (0, common_1.Post)('user'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.Post)('store'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "createStore", null);
tslib_1.__decorate([
    (0, common_1.Put)('publish/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "publishPost", null);
tslib_1.__decorate([
    (0, common_1.Put)('item/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "updateQuanityt", null);
tslib_1.__decorate([
    (0, common_1.Delete)('post/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "deletePost", null);
tslib_1.__decorate([
    (0, common_1.Delete)('item/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "deleteItem", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof data_access_users_1.UserService !== "undefined" && data_access_users_1.UserService) === "function" ? _a : Object, typeof (_b = typeof data_access_posts_1.PostService !== "undefined" && data_access_posts_1.PostService) === "function" ? _b : Object, typeof (_c = typeof data_access_inventory_1.InventoryService !== "undefined" && data_access_inventory_1.InventoryService) === "function" ? _c : Object, typeof (_d = typeof data_access_stores_1.StoreService !== "undefined" && data_access_stores_1.StoreService) === "function" ? _d : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(8), exports);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataAccessUsersModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const user_service_1 = __webpack_require__(8);
const prisma_client_one_1 = __webpack_require__(9);
let DataAccessUsersModule = exports.DataAccessUsersModule = class DataAccessUsersModule {
};
exports.DataAccessUsersModule = DataAccessUsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
        imports: [prisma_client_one_1.PrismaClientOneModule],
    })
], DataAccessUsersModule);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_client_one_1 = __webpack_require__(9);
let UserService = exports.UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async user(userWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async users(options) {
        const { skip, take, cursor, where, orderBy } = options;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createUser(data) {
        return this.prisma.user.create({
            data,
        });
    }
    async updateUser(options) {
        const { where, data } = options;
        return this.prisma.user.update({
            data,
            where,
        });
    }
    async deleteUser(where) {
        return this.prisma.user.delete({
            where,
        });
    }
};
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_client_one_1.PrismaService !== "undefined" && prisma_client_one_1.PrismaService) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Prisma = exports.Post = exports.User = void 0;
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(11), exports);
var one_1 = __webpack_require__(12);
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return one_1.User; } }));
Object.defineProperty(exports, "Post", ({ enumerable: true, get: function () { return one_1.Post; } }));
Object.defineProperty(exports, "Prisma", ({ enumerable: true, get: function () { return one_1.Prisma; } }));


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaClientOneModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(11);
let PrismaClientOneModule = exports.PrismaClientOneModule = class PrismaClientOneModule {
};
exports.PrismaClientOneModule = PrismaClientOneModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaClientOneModule);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const one_1 = __webpack_require__(12);
let PrismaService = exports.PrismaService = class PrismaService extends one_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@prisma/client/one");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataAccessPostsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const post_service_1 = __webpack_require__(15);
const prisma_client_one_1 = __webpack_require__(9);
let DataAccessPostsModule = exports.DataAccessPostsModule = class DataAccessPostsModule {
};
exports.DataAccessPostsModule = DataAccessPostsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [prisma_client_one_1.PrismaClientOneModule],
        controllers: [],
        providers: [post_service_1.PostService],
        exports: [post_service_1.PostService],
    })
], DataAccessPostsModule);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_client_one_1 = __webpack_require__(9);
let PostService = exports.PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async post(postWhereUniqueInput) {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput,
        });
    }
    async posts(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.post.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createPost(data) {
        return this.prisma.post.create({
            data,
        });
    }
    async updatePost(params) {
        const { data, where } = params;
        return this.prisma.post.update({
            data,
            where,
        });
    }
    async deletePost(where) {
        return this.prisma.post.delete({
            where,
        });
    }
};
exports.PostService = PostService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_client_one_1.PrismaService !== "undefined" && prisma_client_one_1.PrismaService) === "function" ? _a : Object])
], PostService);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataAccessInventoryModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const inventory_service_1 = __webpack_require__(18);
const prisma_client_two_1 = __webpack_require__(19);
let DataAccessInventoryModule = exports.DataAccessInventoryModule = class DataAccessInventoryModule {
};
exports.DataAccessInventoryModule = DataAccessInventoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [prisma_client_two_1.PrismaClientTwoModule],
        controllers: [],
        providers: [inventory_service_1.InventoryService],
        exports: [inventory_service_1.InventoryService],
    })
], DataAccessInventoryModule);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_client_two_1 = __webpack_require__(19);
let InventoryService = exports.InventoryService = class InventoryService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async item(itemWhereUniqueInput) {
        return this.prismaService.item.findUnique({
            where: itemWhereUniqueInput,
        });
    }
    async items(options) {
        const { skip, take, where, cursor, orderBy } = options;
        return this.prismaService.item.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createItem(data) {
        return this.prismaService.item.create({
            data,
        });
    }
    async updateItem(options) {
        const { where, data } = options;
        return this.prismaService.item.update({
            data,
            where,
        });
    }
    async deleteItem(where) {
        return this.prismaService.item.delete({
            where,
        });
    }
};
exports.InventoryService = InventoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_client_two_1.PrismaService !== "undefined" && prisma_client_two_1.PrismaService) === "function" ? _a : Object])
], InventoryService);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Item = exports.Prisma = void 0;
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
var two_1 = __webpack_require__(22);
Object.defineProperty(exports, "Prisma", ({ enumerable: true, get: function () { return two_1.Prisma; } }));
Object.defineProperty(exports, "Item", ({ enumerable: true, get: function () { return two_1.Item; } }));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaClientTwoModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(21);
let PrismaClientTwoModule = exports.PrismaClientTwoModule = class PrismaClientTwoModule {
};
exports.PrismaClientTwoModule = PrismaClientTwoModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaClientTwoModule);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const two_1 = __webpack_require__(22);
let PrismaService = exports.PrismaService = class PrismaService extends two_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("@prisma/client/two");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataAccessStoresModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const stores_service_1 = __webpack_require__(25);
const prisma_client_two_1 = __webpack_require__(19);
let DataAccessStoresModule = exports.DataAccessStoresModule = class DataAccessStoresModule {
};
exports.DataAccessStoresModule = DataAccessStoresModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [prisma_client_two_1.PrismaClientTwoModule],
        controllers: [],
        providers: [stores_service_1.StoreService],
        exports: [stores_service_1.StoreService],
    })
], DataAccessStoresModule);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_client_two_1 = __webpack_require__(19);
let StoreService = exports.StoreService = class StoreService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async store(storeWhereUniqueInput) {
        return this.prisma.store.findUnique({
            where: storeWhereUniqueInput,
        });
    }
    async stores(options) {
        const { skip, take, cursor, where, orderBy } = options;
        return this.prisma.store.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createStore(data) {
        return this.prisma.store.create({
            data,
        });
    }
    async updateStore(options) {
        const { where, data } = options;
        return this.prisma.store.update({
            data,
            where,
        });
    }
    async deleteStore(where) {
        return this.prisma.store.delete({
            where,
        });
    }
};
exports.StoreService = StoreService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_client_two_1.PrismaService !== "undefined" && prisma_client_two_1.PrismaService) === "function" ? _a : Object])
], StoreService);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map