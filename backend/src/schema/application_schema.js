import { z } from "zod";

export const create_application_schema = z.object({
  company_name: z.string().trim().min(2, "Company name too short"),
  position: z.string().trim().min(2, "Position too short"),
  location: z.string().trim().min(2, "Location too short"),
  status: z.enum(["applied", "interview", "accepted", "rejected"]).default("applied"),
  applied_at: z.coerce.date().optional(),
  application_link: z.string().url("Invalid URL").optional(),
});

export const update_application_schema = create_application_schema.partial();

export const id_schema = z.object({
  id: z.string().min(1),
});