import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "song",
  title: "Audio excerpt",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "song" }),
    defineField({
      name: "name",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: 'E.g. "2nd movement solo"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "audioFile",
      title: "Audio file",
      type: "file",
      options: {
        accept: "audio/mpeg, audio/mp4, audio/x-m4a",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
    },
  },
});
