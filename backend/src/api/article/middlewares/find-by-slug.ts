/**
 * Article Slug Middleware
 * Allows fetching articles by slug in addition to documentId
 */

export default (config: any, { strapi }: any) => {
  return async (ctx: any, next: any) => {
    const { id } = ctx.params;

    // Check if the ID looks like a documentId (alphanumeric) or a slug (contains hyphens/underscores)
    // If it looks like a slug, convert the params to use slug query
    if (id && !id.match(/^[a-z0-9]+$/i)) {
      // This looks like a slug, not a documentId
      ctx.query = ctx.query || {};
      ctx.query.filters = ctx.query.filters || {};
      ctx.query.filters.slug = { $eq: id };
      
      // Override the ID to fetch all and let the controller filter
      ctx.params.id = undefined;
    }

    await next();
  };
};
