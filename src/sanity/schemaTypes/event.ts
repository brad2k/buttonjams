import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Performance", value: "Performance" },
          { title: "Masterclass", value: "Masterclass" },
          { title: "Recital", value: "Recital" },
        ],
      },
      initialValue: "Performance",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateTime",
      title: "Date & time",
      type: "datetime",
      options: {
        dateFormat: "MMMM D, YYYY",
        timeFormat: "h:mm A",
        timeStep: 15,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      options: {
        list: [
          { title: "Pacific (PT)", value: "America/Los_Angeles" },
          { title: "Mountain (MT)", value: "America/Denver" },
          { title: "Central (CT)", value: "America/Chicago" },
          { title: "Eastern (ET)", value: "America/New_York" },
          { title: "UK (GMT/BST)", value: "Europe/London" },
          { title: "Central Europe (CET/CEST)", value: "Europe/Paris" },
          { title: "Australia/Sydney (AEST/AEDT)", value: "Australia/Sydney" },
          { title: "Australia/Melbourne (AEST/AEDT)", value: "Australia/Melbourne" },
        ],
      },
      initialValue: "America/Los_Angeles",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Ticket / info link",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Date, upcoming first",
      name: "dateTimeAsc",
      by: [{ field: "dateTime", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "dateTime",
    },
  },
});
