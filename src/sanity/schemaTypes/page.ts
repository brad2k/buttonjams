import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Don't change the slug unless you know what you're doing.",
      readOnly: ({ currentUser }) =>
        !currentUser?.roles.find((role) => role.name === "administrator"),
      options: {
        source: "headline",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageCaption",
      title: "Image caption",
      type: "string",
      description: "Credit for the image (e.g., 'David Kim')",
    }),
    defineField({
      name: "imageCaptionIsPhotoCredit",
      title: "Caption is a photo credit",
      type: "boolean",
      description: "If checked, a camera icon and 'Photo credit:' label will be shown before the caption.",
      initialValue: false,
    }),
    defineField({
      name: "imageAlt",
      title: "Image alt text",
      type: "string",
      description: "Accessibility alt text for the hero image",
    }),
    defineField({
      name: "content",
      title: "Body content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "pageTitle",
          title: "Page title",
          type: "string",
          description: `"James Button | " will be prefixed to this title automatically.`,
          options: {
            source: "headline",
            maxLength: 45,
          },
        },
        {
          name: "pageDescription",
          title: "Page description",
          type: "string",
          options: {
            maxLength: 155,
          },
        },
        {
          name: "ogTitle",
          title: "Open Graph title",
          type: "string",
        },
        {
          name: "ogDescription",
          title: "Open Graph description",
          type: "text",
          rows: 3,
          options: {
            maxLength: 155,
          },
        },
      ],
    }),
  ],
});
