import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  // Custom method to increment views
  async incrementViews(ctx) {
    try {
      const { slug } = ctx.params;

      // Find the blog post by slug
      const posts = await strapi.entityService.findMany('api::blog-post.blog-post', {
        filters: { slug },
        publicationState: 'live',
      });

      if (!posts || posts.length === 0) {
        return ctx.notFound('Blog post not found');
      }

      const post = posts[0];

      // Increment views
      const updatedPost = await strapi.entityService.update(
        'api::blog-post.blog-post',
        post.id,
        {
          data: {
            views: (post.views || 0) + 1,
          },
        }
      );

      return ctx.send({ views: updatedPost.views });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));

