module.exports = {

    ROLES: Object.freeze({
        SUPERADMIN: 'SuperAdmin',
        ADMIN: 'Admin',
        SUPPLIER: 'Supplier',
        TEACHER: 'Teacher',
        WRITER: 'Writer',
        USER: 'User'
    }),

    PERMISSIONS: Object.freeze({
        BLOG: {
            CREATE: 'CreateBlog',
            READ: 'ReadBlog',
            UPDATE: 'UpdateBlog',
            DELETE: 'DeleteBlog'
        },
        CATEGORY: {
            CREATE: 'CreateCategory',
            READ: 'ReadCategory',
            UPDATE: 'UpdateCategory',
            DELETE: 'DeleteCategory'
        },
        COURSE: {
            CREATE: 'CreateCourse',
            READ: 'ReadCourse',
            UPDATE: 'UpdateCourse',
            DELETE: 'DeleteCourse'
        },
        PAYMENT: {
            CREATE: 'CreatePayment',
            READ: 'ReadPayment',
            UPDATE: 'UpdatePayment',
            DELETE: 'DeletePayment'
        },
        PERMISSION: {
            CREATE: 'CreatePermission',
            READ: 'ReadPermission',
            UPDATE: 'UpdatePermission',
            DELETE: 'DeletePermission'
        },
        PRODUCT: {
            CREATE: 'CreateProduct',
            READ: 'ReadProduct',
            UPDATE: 'UpdateProduct',
            DELETE: 'DeleteProduct'
        },
        ROLE: {
            CREATE: 'CreateRole',
            READ: 'ReadRole',
            UPDATE: 'UpdateRole',
            DELETE: 'DeleteRole'
        },
        SLIDER: {
            CREATE: 'CreateSlider',
            READ: 'ReadSlider',
            UPDATE: 'UpdateSlider',
            DELETE: 'DeleteSlider'
        },
        USER: {
            CREATE: 'CreateUser',
            READ: 'ReadUser',
            UPDATE: 'UpdateUser',
            DELETE: 'DeleteUser',
            SET_PERMISSION: 'SetPermission',
            FULL_DATA: 'FullData'
        },
        CHAPTER: {
            CREATE: 'CreateChapter',
            READ: 'ReadChapter',
            UPDATE: 'UpdateChapter',
            DELETE: 'DeleteChapter'
        },
        EPISODE: {
            CREATE: 'CreateEpisode',
            READ: 'ReadEpisode',
            UPDATE: 'UpdateEpisode',
            DELETE: 'DeleteEpisode'
        },
        ALL: 'AllRoutes'
    }),

    PRODUCT_TYPES: {
        REAL_PRODUCT: 'REAL_PRODUCT',
        VIRTUAL_PRODUCT: 'VIRTUAL_PRODUCT'
    }
}