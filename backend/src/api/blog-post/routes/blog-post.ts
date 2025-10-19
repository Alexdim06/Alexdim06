import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::blog-post.blog-post');

const customRouter = {
  routes: [
    {
      method: 'POST',
      path: '/blog-posts/:slug/view',
      handler: 'blog-post.incrementViews',
      config: {
        auth: false,
      },
    },
  ],
};

export default {
  routes: [
    ...defaultRouter.routes,
    ...customRouter.routes,
  ],
};

