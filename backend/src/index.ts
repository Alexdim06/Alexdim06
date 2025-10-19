export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set public permissions for API endpoints
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const publicPermissions = {
        'api::project.project': ['find', 'findOne'],
        'api::experience.experience': ['find', 'findOne'],
        'api::certificate.certificate': ['find', 'findOne'],
        'api::skill.skill': ['find', 'findOne'],
        'api::blog-post.blog-post': ['find', 'findOne'],
      };

      for (const [controller, actions] of Object.entries(publicPermissions)) {
        for (const action of actions) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: `${controller}.${action}`,
              role: publicRole.id,
              enabled: true,
            },
          });
        }
      }

      console.log('✅ Public API permissions have been set');
    }
  },
};
