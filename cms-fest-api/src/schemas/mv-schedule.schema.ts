import * as z from "zod";

export const mvScheduleSchema = z.object({
  body: z.object({
    day: z.string(),
    order: z.number(),
    status: z.number().optional(),
    items: z.array(
      z.object({
        time: z.string(),
        title: z.string(),
        locale: z.string(),
        description: z.string(),
      })
    ),
  }),
});

export const mvScheduleUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      day: z.string(),
      order: z.number(),
      status: z.number().optional(),
      items: z.array(
        z.object({
          time: z.string(),
          title: z.string(),
          locale: z.string(),
          description: z.string(),
        })
      ),
    })
});

export const mvScheduleUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});
